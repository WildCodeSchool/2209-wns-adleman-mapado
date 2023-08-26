import { Arg, Int, Mutation, Query, Resolver, Authorized } from "type-graphql";
import Category, { CategoryInput } from "../entity/Category";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import { UserRole } from "../entity/User";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await datasource
      .getRepository(Category)
      .find({ relations: { poi: true } });
  }

  @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    return await datasource.getRepository(Category).save(data);
  }

  @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Category).delete(id);
    if (affected === 0)
      throw new ApolloError("Category not found", "NOT_FOUND");
    return true;
  }

  @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("data") { name }: CategoryInput
  ): Promise<Category> {
    const { affected } = await datasource
      .getRepository(Category)
      .update(id, { name });

    if (affected === 0)
      throw new ApolloError("Category not found", "NOT_FOUND");

    return { id, name };
  }
}
