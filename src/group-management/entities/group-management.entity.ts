import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class GroupManagement {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String)
  @Column({ type: 'uuid' })
  accountId: string;

  @Field(() => String)
  @Column({ type: 'uuid' })
  groupId: string;

  @Field(() => Boolean)
  @Column()
  isAdmin: boolean;
}
