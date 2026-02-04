import { Module } from '@nestjs/common';
import { PrayerTimesService } from './prayer-times.service';
import { PrayerTimesController } from './prayer-times.controller';

@Module({
  controllers: [PrayerTimesController],
  providers: [PrayerTimesService],
  exports: [PrayerTimesService],
})
export class PrayerTimesModule {}
