
import gql from 'graphql-tag';
import client from './apolloClients';






const createPoiMutation = gql`
    mutation createPoi($data: PoiInput!) {
        createPoi(data: $data) {
            email
        }
    }
`;

describe ('Point of interest resolver', () => {
    describe("Point of interest created", () => {
        it('should create a point of interest given valid attributes', async () => {
            const res = await client.mutate({
                mutation: createPoiMutation,
                variables: {data: {email: 'toto@gmail.com', password: 'Abc@123456'}},
            });
            expect(res.data?.createPoi).toHaveProperty("email");
        });

        it('should not create a point of interest given invalid attributes', async () => {
            expect (() => client.mutate({
                mutation: createPoiMutation,
                variables: {data: {email: '', password: ''}},
            })
            ).rejects.toThrowErrorMatchingInlineSnapshot(
                "Argument Validation Error"
            );
        });
    });

    describe("read Point of interest", () => {
        it("should return an array", async () => {});
    });
});
