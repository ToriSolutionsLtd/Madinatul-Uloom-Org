import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventStatus, EventType, RegistrationStatus } from '@prisma/client';

interface CreateEventDto {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  type?: EventType;
  startDate: Date;
  endDate?: Date;
  location?: string;
  capacity?: number;
  isOnline?: boolean;
  onlineUrl?: string;
  requiresRegistration?: boolean;
  registrationDeadline?: Date;
}

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...data,
        status: EventStatus.DRAFT,
      },
    });
  }

  async findAll(options?: {
    status?: EventStatus;
    type?: EventType;
    upcoming?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { status, type, upcoming, page = 1, limit = 20 } = options || {};

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (upcoming) {
      where.startDate = { gte: new Date() };
      where.status = EventStatus.PUBLISHED;
    }

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { startDate: upcoming ? 'asc' : 'desc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, data: Partial<CreateEventDto>) {
    await this.findById(id);
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async publish(id: string) {
    await this.findById(id);
    return this.prisma.event.update({
      where: { id },
      data: {
        status: EventStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  async cancel(id: string) {
    await this.findById(id);
    return this.prisma.event.update({
      where: { id },
      data: { status: EventStatus.CANCELLED },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async register(eventId: string, userId: string) {
    const event = await this.findById(eventId);

    if (event.status !== EventStatus.PUBLISHED) {
      throw new Error('Event is not open for registration');
    }

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      throw new Error('Registration deadline has passed');
    }

    return this.prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
        status: RegistrationStatus.REGISTERED,
      },
    });
  }

  async cancelRegistration(eventId: string, userId: string) {
    return this.prisma.eventRegistration.update({
      where: {
        eventId_userId: { eventId, userId },
      },
      data: { status: RegistrationStatus.CANCELLED },
    });
  }

  async getRegistrations(eventId: string) {
    return this.prisma.eventRegistration.findMany({
      where: { eventId, status: RegistrationStatus.REGISTERED },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }
}
