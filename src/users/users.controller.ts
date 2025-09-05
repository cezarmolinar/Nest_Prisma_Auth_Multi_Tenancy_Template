import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersPresenter } from './users.presenter'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async listAll() {
    const users = await this.userService.listAll()

    const data = users.map((user) => new UsersPresenter(user))
    return data
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createCommonUser(data)
    return new UsersPresenter(user)
  }
}
