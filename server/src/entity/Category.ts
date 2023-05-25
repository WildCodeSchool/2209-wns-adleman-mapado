import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm';
import Poi from './Poi';
import {Field, InputType, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export default class Category {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Poi], {nullable: true})
    @OneToMany(() => Poi, (p) => p.category)
    poi?: PoiId[];
}

@InputType()
export class PoiId {
    @Field()
    id: number;
}

@InputType()
export class CategoryInput {
    @Field()
    name: string;
}
