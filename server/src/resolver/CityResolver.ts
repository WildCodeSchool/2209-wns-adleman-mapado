import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import City, {CityInput, UpdateCityInput} from "../entity/City";
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";


@Resolver(City)
export class CityResolver {
    @Query(() => [City])
    async cities(): Promise<City[]> {
        return await datasource.getRepository(City).find();
    }

    @Mutation(() => City)
    async createCity(@Arg("data") data: CityInput): Promise<City> {
        return await datasource.getRepository(City).save(data);
    }

    @Mutation(() => Boolean)
    async deleteCity(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await datasource.getRepository(City).delete(id);
        if (affected === 0) throw new ApolloError("City not found", "NOT_FOUND");
        return true;
    }

    @Mutation(() => String)
    async updateCity(
        @Arg("id", () => Int) id: number,
        @Arg("data") {name, photo, longitude, latitude}: UpdateCityInput
    ): Promise<string> {
        const {affected} = await datasource
            .getRepository(City)
            .update(id, {name, photo, longitude, latitude});

        if (affected === 0) throw new ApolloError("City not found", "NOT_FOUND");

        return "City updated";
    }
}
