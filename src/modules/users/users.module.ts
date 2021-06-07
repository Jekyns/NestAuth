import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule {}
