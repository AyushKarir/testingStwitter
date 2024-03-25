export const types =`#graphql

    input CreateStweetData{
        content: String!
        imageURL: String
    }

    type Stweet{
        id: ID!
        content: String!
        imageURL: String
        
        author: User
    }
`;