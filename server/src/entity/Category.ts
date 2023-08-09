import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm';
import Poi from './Poi';
import {Field, InputType, Int, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export default class Category {
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(()=> String)
    @Column({ type: "varchar" })
    name: string;

    @Field(() => [Poi], {nullable: true})
    @OneToMany(() => Poi, (p) => p.category)
    poi?: Poi[];
}

@InputType()
export class PoiId {
    @Field(()=> Int)
    id: number;
}

@InputType()
export class CategoryInput {
    @Field(()=> String)
    name: string;
}
