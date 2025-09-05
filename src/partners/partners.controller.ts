import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common'
import { PartnersService } from './partners.service'
import { CreatePartnerDto } from './dto/create-partner.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto, @Req() req: any) {
    console.log('USER', req.user)
    return this.partnersService.create({
      ...createPartnerDto,
      userId: +req.user.userId
    })
  }

  @Get()
  findAll() {
    return this.partnersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(+id)
  }
}
