import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersPresenter } from 'src/users/users.presenter'
import { UsersService } from 'src/users/users.service'

@Controller('partners/users')
export class PartnerUsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createPartnerUser(data)
    return new UsersPresenter(user)
  }
}
