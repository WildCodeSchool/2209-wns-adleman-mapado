<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import User from "./User";

@Entity()

class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    User_id: number;

    @Column()
    name: string;

    @Column({ nullable: true, length: 100 })
    Photo: string;

    @Column()
    City_area: string;

    @Column()
    userId: number;

    @OneToMany(() => User, (u) => u.city)
    user: User;
}

export default City;
=======
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";

@InputType()
export class CityInput {
    @Field()
    name: string;
    @Field()
    image?: string;
}

@Entity()
@ObjectType()
export class City {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "text" })
    image?: string;
}>>>>>>> origin
