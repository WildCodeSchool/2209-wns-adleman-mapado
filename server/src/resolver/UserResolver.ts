import {ApolloError} from "apollo-server-errors";
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import datasource from "../db";
import User, {hashPassword, UserInput, verifyPassword} from "../entity/User";
import City from "../entity/City";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await datasource.getRepository(User).find();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: UserInput): Promise<User> {
        const hashedPassword = await hashPassword(data.password);
        const user = await datasource
            .getRepository(User)
            .save({...data, hashedPassword});
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await datasource.getRepository(User).delete(id);
        if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");
        return true;
    }

    @Mutation(() => String)
    async login(@Arg("data") data: UserInput): Promise<string> {
        const user = await datasource
            .getRepository(User)
            .findOne({where: {email: data.email}});
        const hashedPassword = await hashPassword(data.password);


    //     if (user === null) {
    //         throw new ApolloError("no user");
    //     } else if (!(await verifyPassword(data.password, user.hashedPassword))) {
    //         throw new ApolloError("no password");
    //     } else {
    //         return "ok";
    //     }
    // }
    // I used code below as code above not working like this

        if (
            user === null ||
            typeof user.hashedPassword !== "string" ||
            !(await verifyPassword(data.password, user.hashedPassword))
        )
            throw new ApolloError("invalid credentials");
        else {
            return "ok";
        }
    }
}
