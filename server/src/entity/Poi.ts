import {PrimaryGeneratedColumn, Column, ManyToOne, Entity} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";
import City from "./City";

@InputType()
export class PoiInput{
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    rating?: string;
}

@Entity()
@ObjectType()
class Poi {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 25 })
    name: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "int"})
    gps_coordinates?: number;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    customize_gps_marker?: string;

    @Field()
    @Column({ length: 100 })
    address: string;

    @Field({nullable: true})
    @Column({ length: 500 })
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

    @ManyToOne(() => City, (c) => c.id)
    cities?: City;
}

export default Poi;