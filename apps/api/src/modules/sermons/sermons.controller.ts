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
import { SermonsService } from './sermons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole, SermonType } from '@prisma/client';

@ApiTags('sermons')
@Controller('sermons')
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all published sermons' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: SermonType,
    @Query('speaker') speaker?: string,
  ) {
    return this.sermonsService.findAll({ page, limit, type, speaker });
  }

  @Get('speakers')
  @Public()
  @ApiOperation({ summary: 'Get list of speakers' })
  async getSpeakers() {
    return this.sermonsService.getSpeakers();
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get sermon by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.sermonsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CONTENT_EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new sermon' })
  async create(@Body() createSermonDto: any) {
    return this.sermonsService.create(createSermonDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CONTENT_EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sermon' })
  async update(@Param('id') id: string, @Body() updateSermonDto: any) {
    return this.sermonsService.update(id, updateSermonDto);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CONTENT_EDITOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish a sermon' })
  async publish(@Param('id') id: string) {
    return this.sermonsService.publish(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sermon' })
  async remove(@Param('id') id: string) {
    return this.sermonsService.delete(id);
  }
}
