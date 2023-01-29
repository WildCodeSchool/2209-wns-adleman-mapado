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
}