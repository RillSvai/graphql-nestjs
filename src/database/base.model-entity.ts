import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class BaseModelEntity<TModelEntity> {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  constructor(item: Partial<TModelEntity>) {
    Object.assign(this, item);
  }
}
