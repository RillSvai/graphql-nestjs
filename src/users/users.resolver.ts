import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './model-entities/user.model-entity';
import { PositiveNumberPipe } from 'src/pipes/positive-number.pipe';
import { UserByIdPipe } from './pipes/user-by-id.pipe';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Query(() => User)
  findOneById(
    @Args('id', { type: () => Int }, new PositiveNumberPipe(), UserByIdPipe)
    user: User,
  ): User {
    return user;
  }
}
