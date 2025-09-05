import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { TenantInterceptor } from 'src/tenant/tenant.interceptor'
import { RolesGuard } from 'src/auth/roles/roles.guard'
import { Roles } from 'src/auth/roles/roles.decorator'
import { UserRoles } from 'src/users/user-roles'

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto)
  }

  @Roles(UserRoles.PARTNER)
  @Get()
  findAll() {
    return this.eventsService.findAll()
  }
}
