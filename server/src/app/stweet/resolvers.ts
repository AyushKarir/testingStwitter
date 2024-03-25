import {GraphqlContext} from "../../interfaces"
//import { prismaClient } from "../../../build/clients/db";
import { prismaClient } from "../../clients/db";

import { Stweet } from "@prisma/client";


interface CreateStweetPayload {
    content: string;
    imageURL?: string;
}

const queries ={
    getAllStweets: ()=> prismaClient.stweet.findMany({orderBy: { createdAt: "desc" }})
}

const mutations = {
    createStweet: async(parent: any, {payload}:{payload:CreateStweetPayload}, ctx: GraphqlContext)=>{
        if(!ctx.user) throw new Error('you are not logged in');
        const stweet = await prismaClient.stweet.create({
            data:{
                content: payload.content,
                imageURL: payload.imageURL,
                author: {connect: {id: ctx.user.id} },
            },
        });

        return stweet;
    },
};

const extraResolvers = {
    Stweet:{
        author: (parent: Stweet)=> prismaClient.user.findUnique({where: {id: parent.authorId}}),
    },
}

export const resolvers = {mutations, extraResolvers, queries};