import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import Category, {CategoryInput} from "../entity/Category";
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        return await datasource.getRepository(Category).find({relations: {poi: true}});
    }

    @Mutation(() => Category)
    async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
        return await datasource.getRepository(Category).save(data);
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await datasource.getRepository(Category).delete(id);
        if (affected === 0) throw new ApolloError("Category not found", "NOT_FOUND");
        return true;
    }

    @Mutation(() => Category)
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("data") {name}: CategoryInput
    ): Promise<Category> {
        const {affected} = await datasource
            .getRepository(Category)
            .update(id, {name});

        if (affected === 0) throw new ApolloError("Category not found", "NOT_FOUND");

        return {id, name};
    }


}
