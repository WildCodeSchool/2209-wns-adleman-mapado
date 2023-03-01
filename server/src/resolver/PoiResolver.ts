import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import Poi, {PoiInput} from "../entity/Poi";
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";
import {DeepPartial} from "typeorm";

@Resolver(Poi)
export class PoiResolver {
    @Query(() => [Poi])
    async pois(): Promise<Poi[]> {
        return await datasource.getRepository(Poi).find();
    }

    @Mutation(() => Poi)
    async createPoi(@Arg("data") data: PoiInput): Promise<Poi> {
        return await datasource.getRepository(Poi).save(data);
    }

    @Mutation(() => Boolean)
    async deletePoi(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await datasource.getRepository(Poi).delete(id);
        if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");
        return true;
    }

    // @Mutation(() => User)
    // async updateUser(
    //     @Arg("id", () => Int) id: number,
    //     @Arg("data") { email, password }: UserInput
    // ): Promise<User> {
    //     const { affected } = await datasource
    //         .getRepository(User)
    //         .update(id, { email, password });
    //
    //     if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");
    //
    //     return { id, email };
    // }
}
