import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
   id: number

   @Column({
    unique: true
    })
   username: string

   @Column()
   password: string

   @Column({
    nullable: true
    })
   email: string

   @Column({
    nullable: true
    })
   note: string

}
