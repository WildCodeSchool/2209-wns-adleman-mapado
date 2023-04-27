import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import Poi from './Poi';


@Entity()
class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @OneToMany(() => Poi, (p) => p.category)
    // poi: Poi;
}

export default Category;