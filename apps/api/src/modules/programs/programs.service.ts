import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProgramCategory, ProgramStatus } from '@prisma/client';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async findAll(options?: {
    category?: ProgramCategory;
    status?: ProgramStatus;
    page?: number;
    limit?: number;
  }) {
    const { category, status, page = 1, limit = 20 } = options || {};

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const [programs, total] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.program.count({ where }),
    ]);

    return {
      data: programs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const program = await this.prisma.program.findUnique({
      where: { slug },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async create(data: any) {
    return this.prisma.program.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.program.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.program.delete({
      where: { id },
    });
  }
}
