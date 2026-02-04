import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrayerTimesService {
  constructor(private prisma: PrismaService) {}

  async getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.prayerTime.findUnique({
      where: { date: today },
    });
  }

  async getByDate(date: Date) {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return this.prisma.prayerTime.findUnique({
      where: { date: targetDate },
    });
  }

  async getMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.prisma.prayerTime.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async upsert(data: {
    date: Date;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    fajrIqama?: string;
    dhuhrIqama?: string;
    asrIqama?: string;
    maghribIqama?: string;
    ishaIqama?: string;
    jummah1?: string;
    jummah2?: string;
  }) {
    const date = new Date(data.date);
    date.setHours(0, 0, 0, 0);

    return this.prisma.prayerTime.upsert({
      where: { date },
      update: data,
      create: { ...data, date },
    });
  }

  async bulkUpsert(entries: any[]) {
    const results = await Promise.all(
      entries.map((entry) => this.upsert(entry)),
    );
    return results;
  }
}
