import { Injectable } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { TenantService } from 'src/tenant/tenant.service'

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    private tenentService: TenantService
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        partnerId: this.tenentService.getTenant().id
      }
    })
  }

  findAll() {
    return this.prismaService.event.findMany({
      where: { partnerId: this.tenentService.getTenant().id }
    })
  }
}
