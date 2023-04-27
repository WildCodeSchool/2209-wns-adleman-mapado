
import gql from 'graphql-tag';
import client from './apolloClients';






const createCityMutation = gql`
    mutation createCity($data: CityInput!) {
        createCity(data: $data) {
            email
        }
    }
`;

describe ('City resolver', () => {
    describe("City created", () => {
        it('should create a point of interest given valid attributes', async () => {
            const res = await client.mutate({
                mutation: createCityMutation,
                variables: {data: {email: 'toto@gmail.com', password: 'Abc@123456'}},
            });
            expect(res.data?.createCity).toHaveProperty("email");
        });

        it('should not create a point of interest given invalid attributes', async () => {
            expect (() => client.mutate({
                mutation: createCityMutation,
                variables: {data: {email: '', password: ''}},
            })
            ).rejects.toThrowErrorMatchingInlineSnapshot(
                "Argument Validation Error"
            );
        });
    });

    describe("read City of interest", () => {
        it("should return an array", async () => {});
    });
});
