import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinTable,
} from "typeorm";
import {Field, Float, InputType, Int, ObjectType} from "type-graphql";
import City from "./City";
import Category from "./Category";

@InputType()
export class PoiInput {
  @Field(()=> String)
  @Column({ type: "varchar" })
  name?: string;

  @Field(()=> String,{ nullable: true })
  description?: string;

  @Field(()=> String)
  address?: string;

  @Field(()=> Float, { nullable: true })
  latitude?: number;

  @Field(()=> Float, { nullable: true })
  longitude?: number;

  @Field(()=> Int, { nullable: true })
  rating?: number;

  @Field(()=> Int)
  cityId: number;

  @Field(()=> Int)
  categoryId: number;
}

@InputType()
export class UpdatePoiInput {
  @Field(()=> String, { nullable: true })
  @Column({ type: "varchar" })
  name?: string;

  @Field(()=> String,{ nullable: true })
  description?: string;

  @Field(()=> String,{ nullable: true })
  address?: string;

  @Field(()=> Int,{ nullable: true })
  rating?: number;
}

@Entity()
@ObjectType()
class Poi {
  @Field(()=> Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(()=> String)
  @Column({ length: 25, type: "varchar" })
  name: string;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  longitude?: number;

  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, type: "text" })
  customize_gps_marker?: string;

  @Field(()=> String)
  @Column({ length: 100,  type: "varchar" })
  address: string;

  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, length: 500 })
  description?: string;

  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, type: "text" })
  photo?: string;

  @Field(()=> Int,{ nullable: true })
  @Column({ nullable: true, type: "int" })
  rating?: number;

  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, type: "text" })
  comments?: string;

  // pas sur du type ni de la cohérence
  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, type: "text" })
  audio?: string;

  @Field(()=> String,{ nullable: true })
  @Column({ nullable: true, type: "text" })
  website?: string;

  @Field(()=> Int,{ nullable: true })
  @Column({ nullable: true, type: "int" })
  phone?: number;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (c) => c.poi, { eager: true, cascade: true, onDelete: "CASCADE" })
  @JoinTable({ name: "categoryId" })
  category?: Category;

  @Column({ nullable: true, type: "int" })
  categoryId?: number;

  @Field(() => City, { nullable: true })
  // cascade: true permet de lier les POI à la ville concernée
  // onDelete: "CASCADE" permet de supprimer une ville avec tous les POIs qu'elle possède, sinon ça ne fonctionne pas.
  @ManyToOne(() => City, (c) => c.poi, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  city: City;

  @Field(()=> Int)
  cityId: number;
}

// Petite entity pour le name qu'on récupère du front

@InputType()
export class findPOI {
  @Field(()=> String)
  cityName: string;

  @Field(()=> String)
  poiNameOrAdress: string;

  @Field(()=> Int)
  cityId?: number;

  @Field(()=> Int,{ nullable: true })
  categoryId?: number;

  @Field(()=> String,{ nullable: true })
  description?: string;

  @Field(()=> Int,{ nullable: true })
  rating?: number;

  @Field(()=> String,{ nullable: true })
  photo?: string;
}

export default Poi;
