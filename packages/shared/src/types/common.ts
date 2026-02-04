// Common Types for Madinatul Uloom

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  actorType: 'user' | 'system' | 'api';
  actorIp?: string;
  actorUserAgent?: string;
  action: string;
  resource: string;
  resourceId?: string;
  previousData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  status: 'success' | 'failure';
  errorMessage?: string;
  createdAt: Date;
}

export interface Setting {
  id: string;
  key: string;
  value: unknown;
  description?: string;
  group: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Upload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  storageProvider: 'local' | 's3' | 'r2';
  storagePath: string;
  publicUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  entityType?: string;
  entityId?: string;
  uploadedBy?: string;
  createdAt: Date;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Search
export interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  took: number; // milliseconds
}

// Date Range
export interface DateRange {
  start: Date;
  end: Date;
}

// Coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// File Upload
export interface FileUploadInput {
  file: File;
  entityType?: string;
  entityId?: string;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
}

// Tag operations
export type TagCreateInput = Pick<Tag, 'name' | 'slug' | 'description' | 'color'>;
export type TagUpdateInput = Partial<TagCreateInput>;

// Setting operations  
export type SettingUpdateInput = {
  value: unknown;
  description?: string;
};
