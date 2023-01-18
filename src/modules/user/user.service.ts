import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ): Promise<User> {
    const user = this.repo.create({ firstName, lastName, userName, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ id });
  }

  findByUserName(userName: string) {
    return this.repo.findOne({ userName });
  }

  findAll(userName: string) {
    return this.repo.find({ userName });
  }

  async update(id: number, updateUserDto: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("Enter a valid User");
    }
    this.repo.merge(user, updateUserDto);

    return this.repo.save(user);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
