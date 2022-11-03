import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @Column({ unique : true })
    username: string;

    @Column()
    about: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    image: string;

  }