import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import City from "./City";
import { Matches, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";

export type Role = "visitor" | "cityAdmin" | "superAdmin";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "date" })
  created_at: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "int" })
  role_id?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  hashedPassword?: string;

  @Field({ nullable: true })
  @Column({ enum: ["visitor", "cityAdmin"], default: "visitor" })
  role?: Role;

  @ManyToMany(() => City, (c) => c.id)
  cities?: City[];

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  changePasswordToken: string;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;
}

@InputType()
export class UserSendPassword {
  @Field()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;
}

@InputType()
export class UserChangePassword {
  @Field()
  id: number;

  @Field()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  newPassword: string;
}

@InputType()
export class UserChangePasswordId {
  @Field()
  id: number;
}

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> =>
  await verify(hashedPassword, plainPassword, hashingOptions);

export const getSafeAttributes = (user: User) => ({
  ...user,
  hashedPassword: undefined,
});

export const sendPasswordEmail = async (
  email: string,
  token?: string
): Promise<UserSendPassword> => ({ email, token });

export default User;
