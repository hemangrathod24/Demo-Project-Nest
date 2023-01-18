import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "src/modules/cart/entities/cart.entity";
import { TokenExpiredError } from "jsonwebtoken";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    name: "first_name",
    type: "varchar",
    length: 30,
  })
  firstName: string;

  @Column("varchar", { length: 20, name: "last_name" })
  lastName: string;

  @Column({
    name: "user_name",
    type: "varchar",
    length: 50,
  })
  userName: string;

  @Column({
    name: "password",
    type: "varchar",
  })
  password: string;


  @OneToMany( () => Cart, (cart) => cart.userId)
  cart: Cart[];

}




