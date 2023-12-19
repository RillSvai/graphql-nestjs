import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model-entities/user.model-entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSettings } from './model-entities/user-settings.model-entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
