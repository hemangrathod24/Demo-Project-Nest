import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { AuthService } from "./auth/auth.service";
import { Serialize, UserInterceptor } from "src/interceptors/user-interceptor";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller("auth")
// @Serialize(UserDto)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @UseInterceptors(new UserInterceptor(UserDto))
  @Post("/signup")
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(
      body.firstName,
      body.lastName,
      body.userName,
      body.password
    );
  }

  @Post("/login")
  // @UseGuards(AuthGuard('JwtAuthGuard'))
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body.userName, body.password);
  }

  @UseInterceptors(new UserInterceptor(UserDto))
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(+id);
  }

  @UseInterceptors(new UserInterceptor(UserDto))
  @Get("getAll/:userName")
  find(@Param("userName") userName: string) {
    return this.userService.findAll(userName);
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
