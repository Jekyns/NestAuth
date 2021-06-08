import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { mapFinderOptions } from 'sequelize/types/lib/utils';
import { FindOptions, Op } from 'sequelize';

interface searchObject {
    name: string,
    email: string,
    phone: string,
    gender: string
}
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(page: number = 0, limit: number, searchObject: searchObject) {
    const findOptions: FindOptions = {};
    if (limit) {
      findOptions.limit = limit;
    }
    findOptions.offset = limit ? limit*page: 0;
    findOptions.where = {};
    await Promise.all(Object.keys(searchObject).map((searchKey)=>{
        findOptions.where[searchKey] = {
           [Op.like]: `%${searchObject[searchKey]}%`
        };
    }));
    return await this.userRepository.findAll(findOptions);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async update(id: number, updatedUser: UserDto) {
    const user = await this.findOne(id);
    return await user.update(updatedUser);
    // return await this.userRepository.update(user, updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    return await user.destroy();
    // return await this.userRepository.destroy(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { phone } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
