import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChatRoom {
  public static from(data: Partial<ChatRoom>): ChatRoom {
    const entity = new ChatRoom();
    Object.assign(entity, data);
    return entity;
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  groupId: string;

  @Field(() => String)
  @Column()
  senderId: string;

  @Field(() => String)
  @Column()
  message: string;
}
