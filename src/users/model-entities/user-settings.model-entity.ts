import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModelEntity } from 'src/database/base.model-entity';
import { Column, Entity } from 'typeorm';
@ObjectType()
@Entity({ name: 'user_settings' })
export class UserSettings extends BaseModelEntity<UserSettings> {
  @Field({ defaultValue: false })
  @Column({ name: 'receive_notifications', default: false })
  receiveNotification: boolean;

  @Field({ defaultValue: false })
  @Column({ name: 'receive_emails', default: false })
  receiveEmails: boolean;
}
