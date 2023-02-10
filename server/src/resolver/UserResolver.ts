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
import jwt from "jsonwebtoken";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  Role,
  UserChangePassword,
  UserInput,
  verifyPassword,
} from "../entity/User";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { env } from "../environment";
import { ContextType } from "../index";

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
      .save({ ...data, hashedPassword });
    return user;
  }

  @Authorized<Role>(["cityAdmin"])
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(User).delete(id);
    if (affected === 0) throw new ApolloError("user not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    // const hashedPassword = await hashPassword(password);

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

  // // Reset Password email & token creation


  // // Reset Password

  // @Mutation(() => User)
  // async updatePassword(
  //   @Arg('id', () => Int) id: number,
  //   @Arg('data') data: UserUpdatePassword,
  // ):Promise<User> {
  //   const { email, oldPassword, newPassword } = data;

  //   const userToUpdate = await datasource
  //     .getRepository(User)
  //     .findOne({ where: { email } });

  //   if (
  //     userToUpdate === null
  //   || typeof userToUpdate.hashedPassword !== 'string'
  //   || !(await verifyPassword(oldPassword, userToUpdate.hashedPassword))
  //   ) { throw new ApolloError('invalid credentials'); }

  //   const hashedPassword = await hashPassword(newPassword);

  //   userToUpdate.hashedPassword = hashedPassword;

  //   await datasource.getRepository(User).save(userToUpdate);

  //   return getSafeAttributes(userToUpdate);
  // }


  // mutation to change password

  @Mutation(() => User)
  async changePassword(
    // @Arg('id', () => Int) id: number,
    @Arg("data") data: UserChangePassword
  ): Promise<boolean> {

    // deconstruct data from UserChangePassword entity
    const { email, prevPassword, newPassword } = data;

    //create userToUpdate which is the user in the db matching the email (with properties email, hashedPassword, etc)
    const userToUpdate = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    // verify if user is null > throw error
    if (!userToUpdate) throw new ApolloError("invalid credentials");

    // // RESET PASSWORD VIA EMAIL

    // // sender information used to authenticate
    // const transporter = nodemailer.createTransport({
    //   service: "hotmail",
    //   auth: {
    //     user: "mapado-wns@outlook.com",
    //     pass: "projetMapado",
    //   },
    // });

    // // options of email to send

    // const options = {
    //   from: "mapado-wns@outlook.com",
    //   // to: email,
    //   to: "mapado-wns@outlook.com",
    //   subject: "test nodemailer",
    //   text: "testing nodemailer",
    // };

    // try {
    //   // create token
    //   const emailToken = jwt.sign(
    //     {
    //       email: { email },
    //     },
    //     env.JWT_PRIVATE_KEY,
    //     {
    //       expiresIn: "1d",
    //     }
    //   );

    //   const url = `http://localhost:3000/reset-password/${emailToken}`;

    //   //  send password reset email

    //   await transporter.sendMail({
    //     to: email,
    //     subject: "Password Reset",
    //     html: `Please click this link to change your password: <a href="${url}">${url}</a>`,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    // // save token in database

    // if (token) {

    //   userToUpdate.token = token;
    // }

    // if (userToUpdate.token === token) {

    //   // hash new password
      const hashedPassword = await hashPassword(newPassword);

      // update password in user data

      userToUpdate.hashedPassword = hashedPassword;

      // save new password in db

      await datasource.getRepository(User).save(userToUpdate);

    // }
    return true;
  }


}
