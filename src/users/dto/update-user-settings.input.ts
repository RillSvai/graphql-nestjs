import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserSettingsInput {
  @Field({ defaultValue: false })
  receiveNotification?: boolean;

  @Field({ defaultValue: false })
  receiveEmails?: boolean;
}
