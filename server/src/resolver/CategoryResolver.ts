import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Category, {CategoryInput} from "../entity/Category";
import datasource from "../db";

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        return await datasource.getRepository(Category).find();
    }

    @Mutation(() => Category)
    async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
      return await datasource.getRepository(Category).save(data);
    }

}
