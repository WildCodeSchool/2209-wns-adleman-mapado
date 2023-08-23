import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import City from "./City";
import { IsEmail, Matches, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";

export enum UserRole {
  SUPERADMIN = "Super Administrator",
  CITYADMIN = "City Administrator",
  POICREATOR = "POI Creator",
  VISITOR = "Visitor",
}

@InputType()
export class UserRoleInput {
  @Field()
  @IsEmail()
  email?: string;

  @Field()
  role: string;
}

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;

  @Field(() => [CityId], { nullable: true })
  cities?: CityId[];
}

@InputType()
export class CityId {
  @Field()
  id: number;
}

@ObjectType()
@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  hashedPassword?: string;

  @Field(() => [CityId], { nullable: true })
  cities?: CityId[];

  // @Field(() => [Role], {nullable: true})
  // role?: Role[];
}

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
  userName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  profilePicture?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  hashedPassword?: string;

  @Field({ nullable: true })
  @Column({ default: UserRole.VISITOR, enum: UserRole })
  role: string;

  @Field(() => [City], { defaultValue: [] })
  @ManyToMany(() => City, (c) => c.users, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  cities: City[];

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  changePasswordToken: string;
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
