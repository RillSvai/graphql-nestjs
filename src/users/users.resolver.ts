import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './model-entities/user.model-entity';
import { PositiveNumberPipe } from 'src/pipes/positive-number.pipe';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { CreateUserInput } from './dto/create-user.input';
import { UsernameExistPipe } from './pipes/username-exist.pipe';
import { UpdateUserInput } from './dto/update-user.input';

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

  @Mutation(() => User)
  async create(
    @Args('createUserInput', UsernameExistPipe)
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async update(
    @Args(
      'id',
      { type: () => Int },
      new PositiveNumberPipe(),
      UserByIdPipe,
      UsernameExistPipe,
    )
    user: User,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.usersService.update(user, updateUserInput);
  }

  @Mutation(() => User)
  async remove(
    @Args('id', { type: () => Int }, new PositiveNumberPipe(), UserByIdPipe)
    user: User,
  ): Promise<User> {
    return await this.usersService.remove(user);
  }
}
