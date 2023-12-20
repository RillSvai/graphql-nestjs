import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  displayName?: string;
}
