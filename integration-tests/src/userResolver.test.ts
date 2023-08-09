import {gql} from "@apollo/client/core";
import User from "../../server/src/entity/User";
import client from "./apolloClient";
import db from "../../server/src/db";


/*

    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
id
  }
}
}*/

const createUserMutation = gql`
    mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
            email
        }
    }
`;

/*query Users {
  users {
    id
  }
}*/

const getUsersQuery = gql`
    query Users {
        users {
            id
        }
    }
`;

/* if error =>
try{
//code
} catch(err) {
                console.log(JSON.stringify(err, null, 2))
            }
 */

describe("User resolver", () => {
    describe("create user", () => {
        it("should create user given valid attributes", async () => {
            const res = await client.mutate({
                mutation: createUserMutation, variables: {data: {email: "plato@plato.com", password: "Pl@to123"}},
            });
            expect(res.data?.createUser).toHaveProperty("email");
        });

        it("should not create user given invalid attributes and return an error", async () => {
            await expect(() => client.mutate({
                mutation: createUserMutation, variables: {data: {email: "", password: "potato"}}
            })).rejects.toThrowErrorMatchingInlineSnapshot(`"Argument Validation Error"`);
        });
    });

    describe("read users", () => {
        it("should return an array", async () => {
            await db
                .getRepository(User)
                .insert([
                    {id: 1, email: "plato@plato.com", hashedPassword: "Pl@to123"},
                    {id: 2, email: "plata@plata.com", hashedPassword: "Pl@ta123"}
                ]);

            const res = await client.query({
                query: getUsersQuery, fetchPolicy: "no-cache",
            });

            expect(res.data.users.length).toBe(2);
            expect(res.data.users[0]).toHaveProperty("id");
        });
    });
});