'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface ProgramFiltersProps {
  totalPrograms: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  ageGroup: string;
  onAgeGroupChange: (value: string) => void;
  programType: string;
  onProgramTypeChange: (value: string) => void;
  schedule: string;
  onScheduleChange: (value: string) => void;
}

export function ProgramFilters({
  totalPrograms,
  searchQuery,
  onSearchChange,
  ageGroup,
  onAgeGroupChange,
  programType,
  onProgramTypeChange,
  schedule,
  onScheduleChange,
}: ProgramFiltersProps) {
  return (
    <div className="bg-card flex flex-col items-center justify-between gap-4 rounded-xl border p-4 shadow-sm lg:flex-row">
      {/* Title & Count */}
      <div className="flex w-full items-center gap-2 lg:w-auto">
        <h3 className="text-foreground mr-2 whitespace-nowrap text-lg font-bold">All Programs</h3>
        <Badge variant="success" className="text-xs font-bold">
          {totalPrograms} Courses
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex w-full flex-col gap-3 overflow-x-auto pb-2 sm:flex-row sm:pb-0 lg:w-auto">
        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-secondary/50 focus:ring-primary pl-9 focus:ring-1"
          />
        </div>

        {/* Age Group Select */}
        <Select value={ageGroup} onValueChange={onAgeGroupChange}>
          <SelectTrigger className="bg-secondary/50 min-w-[140px]">
            <SelectValue placeholder="Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="kids">Kids (5-12)</SelectItem>
            <SelectItem value="teens">Teens (13-18)</SelectItem>
            <SelectItem value="adults">Adults (18+)</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>

        {/* Program Type Select */}
        <Select value={programType} onValueChange={onProgramTypeChange}>
          <SelectTrigger className="bg-secondary/50 min-w-[140px]">
            <SelectValue placeholder="Program Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="quran">Quran</SelectItem>
            <SelectItem value="islamic-studies">Islamic Studies</SelectItem>
            <SelectItem value="arabic">Arabic Language</SelectItem>
            <SelectItem value="workshops">Workshops</SelectItem>
          </SelectContent>
        </Select>

        {/* Schedule Select */}
        <Select value={schedule} onValueChange={onScheduleChange}>
          <SelectTrigger className="bg-secondary/50 min-w-[140px]">
            <SelectValue placeholder="Schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schedules</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
            <SelectItem value="weekday">Weekday Evening</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
