import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModelEntity } from 'src/database/base.model-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseModelEntity<User> {
  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'display_name' })
  displayName?: string;
}
