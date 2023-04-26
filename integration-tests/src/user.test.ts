import { gql }  from "apollo/client/core"
import User from "../../server/src/entity/User";
import client from "./apolloClient";
import db from "../../server/src/db";
import { DocumentNode } from "graphql";

const createUserMutation : DocumentNode = gql`
    mutation CreateUser($data: CreateUserInput!) {
        createUser(data: $data) {
            id
            email
            hashedPassword
        }
    }
`;

const readUsersQuery = gql`
    query Users {
        users {
            id
            email
            hashedPassword
        }
    }
`;

describe("User resolver", () => {
    describe("createUser", () => {
        it("should create user given valid attributes", async () => {
            const res = await client.mutate({
                mutation: createUserMutation,
                variables: { data: { email: 'jean-eude@gmail.com', hashedPassword: 'abcd@1234'}},
            });
            expect(res.data.createUser).toHaveProperty("id");
            expect(res.data.createUser).toHaveProperty("email", "jean-eude@gmail.com");
            expect(res.data.createUser).toHaveProperty("hashedPassword", 'abcd@1234');
        });

        it("should not create user given invalid attributes", async () => {
            expect(() => 
            client.mutate({
                mutation: createUserMutation,
                variables: { data: {hashedPassword: '', email: ''}},
            })
                ).rejects.toThrowErrorMatchingInlineSnapshot(
                    `"Argument Validation Error"`
                );
        });
    });

    describe("read Users", () => {
        it ("should return an array", async () => {
            await db
            .getRepository(User)
            .insert([{ email:'toto@gmail.com', hashedPassword:'tutu@321'},{ email:'tata@gmail.com', hashedPassword:'titi@123'}]);

            const res = await client.query({ 
                query: readUsersQuery,
                fetchPolicy: "no-cache",
            });

            expect(res.data.users.length).toBe(2);
            expect(res.data.users[0]).toHaveProperty("id");
            expect(res.data.users[0]).toHaveProperty("hashedPassword");
            expect(res.data.users[0]).toHaveProperty("email");
        });
    });
});
