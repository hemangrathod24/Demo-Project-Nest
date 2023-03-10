import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UserService } from "../user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signup(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ) {
    const users = await this.userService.findByUserName(userName);
    if (users) {
      throw new BadRequestException("Sorry :)Already Email In Use ");
    }
    const saltOrRounds = await bcrypt.genSalt();
    const result = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userService.create(
      firstName,
      lastName,
      userName,
      result
    );
    return user;
  }

  async login(userName: string, password: string) {
    const user = await this.userService.findByUserName(userName);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const hash = await bcrypt.compare(password, user.password);
    if (!hash) {
      throw new BadRequestException("Bad Password");
    }
    // return user;
    const payload = { username: user.userName, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
