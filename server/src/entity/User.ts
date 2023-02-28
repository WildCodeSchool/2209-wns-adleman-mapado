import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";
import City from "./City";
import {IsEmail, Matches, MinLength} from "class-validator";
import {argon2id, hash, verify} from "argon2";
import {userInfo} from "os";

export type Role = "visitor" | "cityAdmin" | "superAdmin";

@Entity()
@ObjectType()
class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "int"})
    role_id?: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    email?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    hashedPassword?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    role?: Role;

    @Field(() => [City], {nullable: true})
    @ManyToMany(() => City, (c) => c.id)
    cities?: City[];
}

@InputType()
export class UserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    password: string;
}

const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
}

export const hashPassword = async (plainPassword: string): Promise<string> =>
await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => 
    await verify(hashedPassword, plainPassword, hashingOptions);

// export const getSafeAttributes = (use: User) => ({
//     ...userInfo,
//     hashedPassword: undefined
// });

export default User;
