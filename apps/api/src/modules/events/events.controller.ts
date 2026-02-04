import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole, EventStatus, EventType } from '@prisma/client';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all published events' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: EventType,
    @Query('upcoming') upcoming?: boolean,
  ) {
    return this.eventsService.findAll({
      status: EventStatus.PUBLISHED,
      type,
      upcoming,
      page,
      limit,
    });
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get event by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.EVENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  async create(@Body() createEventDto: any) {
    return this.eventsService.create(createEventDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.EVENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event' })
  async update(@Param('id') id: string, @Body() updateEventDto: any) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.EVENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish an event' })
  async publish(@Param('id') id: string) {
    return this.eventsService.publish(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.EVENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an event' })
  async remove(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register for an event' })
  async register(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.eventsService.register(id, userId);
  }

  @Get(':id/registrations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.EVENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get event registrations' })
  async getRegistrations(@Param('id') id: string) {
    return this.eventsService.getRegistrations(id);
  }
}
