import { gql } from "@apollo/client";
import { client } from "@gql";

export const querySession = () => client.query({
    query: gql`
        query Auth {
            auth {
                id
                date {
                    create
                    update
                }
                email
                details {
                    fullName
                    imageUrl
                }
            }
        }
    `,
});
