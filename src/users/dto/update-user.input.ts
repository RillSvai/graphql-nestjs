import { InputType, PartialType, Field } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { UpdateUserSettingsInput } from './update-user-settings.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => UpdateUserSettingsInput, { nullable: true })
  settings?: UpdateUserSettingsInput;
}
