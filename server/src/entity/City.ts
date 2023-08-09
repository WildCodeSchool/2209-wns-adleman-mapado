import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Field, Float, InputType, ObjectType } from "type-graphql";
import User from "./User";
import Poi from "./Poi";

@InputType()
export class CityInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  photo?: string;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  photo?: string;
}

@Entity()
@ObjectType()
export default class City {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  photo?: string;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: "decimal" })
  longitude?: number;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (u) => u.cities, { eager: true, cascade: true, onDelete: "CASCADE" })
  users?: User[];

  @Field(() => [Poi], { nullable: true })
  @OneToMany(() => Poi, (p) => p.city )
  poi?: Poi[];
}


@InputType()
export class CityRequested {
  @Field()
  cityName: string;
}

export const fetchCityName = async (
  cityName: string
): Promise<CityRequested> => ({ cityName });
