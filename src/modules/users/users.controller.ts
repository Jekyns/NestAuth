import { Controller, Body, Query, Post, Get, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('page') pageParam: string, @Query('limit') limitParam: string) {
    const page = pageParam ? +pageParam : null;
    const limit = limitParam ? +limitParam : null;
    return this.usersService.findAll(page ?? null, +limit ?? null);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}