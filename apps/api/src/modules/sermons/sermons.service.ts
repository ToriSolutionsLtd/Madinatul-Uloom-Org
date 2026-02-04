import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SermonType } from '@prisma/client';

@Injectable()
export class SermonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(options?: {
    type?: SermonType;
    speaker?: string;
    isPublished?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { type, speaker, isPublished = true, page = 1, limit = 20 } = options || {};

    const where: any = { isPublished };
    if (type) where.type = type;
    if (speaker) where.speakerName = { contains: speaker, mode: 'insensitive' };

    const [sermons, total] = await Promise.all([
      this.prisma.sermon.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      this.prisma.sermon.count({ where }),
    ]);

    return {
      data: sermons,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const sermon = await this.prisma.sermon.findUnique({
      where: { slug },
    });

    if (!sermon) {
      throw new NotFoundException('Sermon not found');
    }

    // Increment views
    await this.prisma.sermon.update({
      where: { id: sermon.id },
      data: { viewCount: { increment: 1 } },
    });

    return sermon;
  }

  async create(data: any) {
    return this.prisma.sermon.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.sermon.update({
      where: { id },
      data,
    });
  }

  async publish(id: string) {
    return this.prisma.sermon.update({
      where: { id },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return this.prisma.sermon.delete({
      where: { id },
    });
  }

  async getSpeakers() {
    const speakers = await this.prisma.sermon.findMany({
      where: { isPublished: true },
      select: { speakerName: true },
      distinct: ['speakerName'],
    });
    return speakers.map((s) => s.speakerName);
  }
}
