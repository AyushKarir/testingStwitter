import axios from "axios";
import { User } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
interface GoogleTokenResult{
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?:string;
    kid?:string;
    typ?:string;
}
const queries = {
    verifyGoogleToken: async(parent:any, {token}: {token: string})=>{
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', googleToken);

        const {data} = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
            responseType: 'json'
        })
        
        
        //this checks for user in the db
        const user = await prismaClient.user.findUnique({
            where: {email: data.email},
        });
        //create a new user if not in the db
        if(!user){
            await prismaClient.user.create({
                data: {
                    firstName: data.given_name as string,
                    email: data.email as string,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                },
            })
        }

        const userInDb = await prismaClient.user.findUnique({  where: {email: data.email},  });
        if(!userInDb) throw new Error ("User with email not found");

    

        const userToken = JWTService.generateTokenForUser(userInDb);

        return userToken;
    },
    getCurrentUser: async(parent:any, args: any, ctx: GraphqlContext) =>{
        
        const id = ctx.user?.id;
        if(!id){ return null;}

        const user = await prismaClient.user.findUnique({where: {id}})
        return user;
    },
};

const extraResolvers = {
    User: {
        stweets: (parent: User) => prismaClient.stweet.findMany({where: {author:{id: parent.id}}}),
    }
}

export const resolvers={queries, extraResolvers};