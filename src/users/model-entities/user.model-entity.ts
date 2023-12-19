import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModelEntity } from 'src/database/base.model-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserSettings } from './user-settings.model-entity';

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseModelEntity<User> {
  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'display_name' })
  displayName?: string;

  @Field({ nullable: true })
  @OneToOne(() => UserSettings, { nullable: true, cascade: true })
  @JoinColumn({ name: 'user_settings_id' })
  settings?: UserSettings;
}
