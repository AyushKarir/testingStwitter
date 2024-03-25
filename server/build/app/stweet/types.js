"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

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
