import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";

@InputType()
export class CityInput {
    @Field()
    name: string;
}

@Entity()
@ObjectType()
export class City {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;
}