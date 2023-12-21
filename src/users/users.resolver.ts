import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './model-entities/user.model-entity';
import { PositiveNumberPipe } from 'src/pipes/positive-number.pipe';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { CreateUserInput } from './dto/create-user.input';
import { UsernameExistPipe } from './pipes/username-exist.pipe';
import { UpdateUserInput } from './dto/update-user.input';
import { AsyncLocalStorage } from 'async_hooks';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly als: AsyncLocalStorage<any>,
  ) {}

  @Query(() => [User])
  async find(): Promise<User[]> {
    console.log(this.als.getStore());
    return await this.usersService.find();
  }

  @Subscription(() => String, { name: 'userFinded' })
  userFinded() {
    return pubSub.asyncIterator('userFinded');
  }

  @Query(() => User)
  findOneById(
    @Args('id', { type: () => Int }, new PositiveNumberPipe(), UserByIdPipe)
    user: User,
  ): User {
    pubSub.publish('userFinded', { userFinded: user.username });
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
