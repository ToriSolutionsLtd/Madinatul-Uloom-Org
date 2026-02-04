import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrayerTimesService } from './prayer-times.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('prayer-times')
@Controller('prayer-times')
export class PrayerTimesController {
  constructor(private readonly prayerTimesService: PrayerTimesService) {}

  @Get('today')
  @Public()
  @ApiOperation({ summary: 'Get today\'s prayer times' })
  async getToday() {
    return this.prayerTimesService.getToday();
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get prayer times by date or month' })
  async get(@Query('date') date?: string, @Query('year') year?: number, @Query('month') month?: number) {
    if (date) {
      return this.prayerTimesService.getByDate(new Date(date));
    }
    if (year && month) {
      return this.prayerTimesService.getMonth(year, month);
    }
    return this.prayerTimesService.getToday();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CONTENT_EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update prayer times' })
  async upsert(@Body() data: any) {
    return this.prayerTimesService.upsert(data);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk update prayer times' })
  async bulkUpsert(@Body() data: any[]) {
    return this.prayerTimesService.bulkUpsert(data);
  }
}
