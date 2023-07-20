import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  UserInput,
  UserRole,
  UserRoleInput,
  UserSendPassword,
  verifyPassword,
} from "../entity/User";
import { env } from "../environment";
import { ContextType } from "../index";
import City from "../entity/City";
import { Any } from "typeorm";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    function compare(a: any, b: any) {
      if (a.email < b.email) {
        return -1;
      }
      if (a.email > b.email) {
        return 1;
      }
      return 0;
    }
    const users = await datasource.getRepository(User).find();

    const sortedUsers = users.sort(compare);
    return sortedUsers;
  }

  // @Query(() => City)
  // async userCities(@Arg("userId", () => Int) userId: number): Promise<any> {
  //   const citiesIds = await datasource
  //     .getRepository(User)
  //     .findOne({ where: { id: userId } });
  //   const citiesList = await datasource.getRepository(City).find();

  //   console.log(citiesIds);
  //   console.log(citiesList);
  // }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const userList = datasource.getRepository(User).find();
    const userListEmail = (await userList).map((user) => user.email);
    if (userListEmail.indexOf(data.email) !== -1) {
      throw new GraphQLError(
        "Un compte est déjà enregistré avec cette adresse email",
        null,
        null,
        null,
        null,
        null,
        {
          extensions: {
            code: "FORBIDDEN",
          },
        }
      );
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
    return user;
  }

  @Authorized<UserRole>([UserRole.SUPERADMIN])
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(User).delete(id);
    if (affected === 0) throw new ApolloError("user not found", "NOT_FOUND");
    return true;
  }

  @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
  @Mutation(() => User)
  async updateUserCities(
    @Arg("userId", () => Int) userId: number,
    @Arg("cityId", () => Int) cityId: number
  ): Promise<User> {
    let user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userId }, relations: { cities: true } });
    if (!user) throw new ApolloError("User not found", "NOT_FOUND");
    let city = await datasource
      .getRepository(City)
      .findOne({ where: { id: cityId } });
    const cityExists = user.cities.filter((city) => {
      console.log(city.id, cityId);
      return city.id === cityId;
    });
    if (cityExists.length) {
      throw new ApolloError("City already assigned", "DUPLICATE_NOT_ALLOWED");
    } else if (!city) {
      throw new ApolloError("City not found", "NOT_FOUND");
    } else {
      user.cities = [...user.cities, city];
    }
    datasource.getRepository(User).save(user);
    return user;
  }

  //Update User Role
  @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
  @Mutation(() => String)
  async updateUserRole(
    @Arg("data", () => UserRoleInput) { email, role }: UserRoleInput
  ): Promise<String> {
    let userToUpdate = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    if (!userToUpdate) throw new ApolloError("User not found", "NOT_FOUND");

    userToUpdate.role = role;

    const updatedUser = await datasource.getRepository(User).save(userToUpdate);

    return `${updatedUser.email} been assigned ${updatedUser.role} role`;
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    ///const hashedPassword = await hashPassword(password);

    if (
      user === null ||
      !user.hashedPassword ||
      !(await verifyPassword(password, user.hashedPassword))
    ) {
      throw new ApolloError("invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      domain: env.SERVER_HOST,
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return "logged out";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  @Query(() => User)
  async getUserCities(@Arg("id") id: number): Promise<User> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id }, relations: { cities: true } });
    if (!user) throw new ApolloError("no such user", "NOT_FOUND");

    return user;
  }

  @Mutation(() => User)
  async sendPasswordEmail(@Arg("data") data: UserSendPassword): Promise<User> {
    const { email } = data;

    const userToEmail = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (!userToEmail) throw new ApolloError("invalid credentials");

    // sender information used to authenticate
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "mapado-wns@outlook.com",
        pass: "projetMapado",
      },
      from: "mapado-wns@outlook.com",
    });

    const userId = userToEmail.id;
    const hashedPassword = userToEmail.hashedPassword;

    const secret = hashedPassword!;

    const emailToken = jwt.sign({ userId }, secret, { expiresIn: 36000 });

    try {
      // create token
      const url = `http://localhost:3000/password/reset/:${userId}/:${emailToken}`;

      //  send password reset email
      await transporter.sendMail({
        from: "Mapado Team mapado-wns@outlook.com",
        to: email,
        subject: "Mapado reset password",
        html: `Hi ${email}, we received a request to reset your password. Please click the following link to reset your password.: <a href="${url}">${url}</a>`,
        text: `Hi ${email}, we received a request to reset your password. Please click the following link to reset your password.: <a href="${url}">${url}</a>`,
      });
    } catch (e) {
      console.log(e);
    }

    // add token to user in db
    userToEmail.changePasswordToken = emailToken;

    // save token in db
    await datasource.getRepository(User).save(userToEmail);

    return userToEmail;
  }

  // // Query to fetch and send changeEmailToken to client

  @Query(() => User)
  async fetchToken(@Arg("id", () => Number) id: number): Promise<User> {
    const userToUpdatePassword = await datasource
      .getRepository(User)
      .findOne({ where: { id } });
    if (userToUpdatePassword === null)
      throw new ApolloError("user not found", "NOT_FOUND");
    return userToUpdatePassword;
  }

  // mutation to change password
  @Mutation(() => User)
  async changePassword(
    @Arg("id", () => Int) id: number,
    @Arg("newPassword", () => String) newPassword: string
  ): Promise<boolean> {
    //create userToUpdate which is the user in the db matching the email (with properties email, hashedPassword, etc)
    const userToUpdate = await datasource
      .getRepository(User)
      .findOne({ where: { id } });
    // verify if user is null > throw error
    if (!userToUpdate)
      throw new ApolloError("invalid credentials no such user");

    // match UserSendPassword token to token in headers
    if (!userToUpdate.changePasswordToken)
      throw new ApolloError("invalid credentials no such token");

    // hash new password
    const newHashedPassword = await hashPassword(newPassword);

    // update password in user data
    userToUpdate.hashedPassword = newHashedPassword;

    // save new password in db
    await datasource.getRepository(User).save(userToUpdate);

    return true;
  }
}
