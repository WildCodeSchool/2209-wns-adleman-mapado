import {PrimaryGeneratedColumn, Column, ManyToOne, Entity, JoinTable} from "typeorm";
import {Field, Float, InputType, ObjectType} from "type-graphql";
import City from "./City";

@InputType()
export class PoiInput {
    @Field()
    name: string;

    @Field({nullable: true})
    description?: string;

    @Field()
    address: string;

    @Field({nullable: true})
    latitude?: number;

    @Field({nullable: true})
    longitude?: number;

    @Field({nullable: true})
    rating?: number;

    @Field()
    cityId: number
}

@InputType()
export class UpdatePoiInput {
    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    description?: string;

    @Field({nullable: true})
    address?: string;

    @Field({nullable: true})
    rating?: number;
}

@Entity()
@ObjectType()
class Poi {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({length: 25})
    name: string;

    @Field(() => Float, {nullable: true})
    @Column({nullable: true, type: "decimal"})
    latitude?: number;

    @Field(() => Float, {nullable: true})
    @Column({nullable: true, type: "decimal"})
    longitude?: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    customize_gps_marker?: string;

    @Field()
    @Column({length: 100})
    address: string;

    @Field({nullable: true})
    @Column({nullable: true, length: 500})
    description?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    photo?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "int"})
    rating?: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    comments?: string;

    // pas sur du type ni de la cohérence
    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    audio?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    website?: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "int"})
    phone?: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "int"})
    categoryId?: number;

    //Potentiellement à implémenter
    // @Column()
    // email: string;

    // @Column()
    // opening_hours: string;
    // @Field()
    // @OneToMany(() => Category, (c) => c.poi)
    // category: Category;

    @Field(() => City, {nullable: true})
    // cascade: true permet de lier les POI à la ville concernée
    // onDelete: "CASCADE" permet de supprimer une ville avec tous les POIs qu'elle possède, sinon ça ne fonctionne pas.
    @ManyToOne(() => City, (c) => c.poi, {cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    city: City

    @Column()
    cityId: number
}

export default Poi;