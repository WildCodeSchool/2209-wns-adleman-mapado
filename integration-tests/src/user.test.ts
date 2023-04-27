
import gql from 'graphql-tag';
import client from './apolloClients';






const createUserMutation = gql`
    mutation createUser($data: UserInput!) {
        createUser(data: $data) {
            email
        }
    }
`;

describe ('User resolver', () => {
    describe("create user", () => {
        it('should create a user given valid attributes', async () => {
            const res = await client.mutate({
                mutation: createUserMutation,
                variables: {data: {email: 'toto@gmail.com', password: 'Abc@123456'}},
            });
            expect(res.data?.createUser).toHaveProperty("email");
        });

        it('should not create a user given invalid attributes', async () => {
            expect (() => client.mutate({
                mutation: createUserMutation,
                variables: {data: {email: '', password: ''}},
            })
            ).rejects.toThrowErrorMatchingInlineSnapshot(
                "Argument Validation Error"
            );
        });
    });

    describe("read users", () => {
        it("should return an array", async () => {});
    });
});
