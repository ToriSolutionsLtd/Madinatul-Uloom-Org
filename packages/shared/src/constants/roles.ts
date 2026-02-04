import { UserRole } from '../types/user';

/**
 * Role hierarchy - higher numbers have more privileges
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 100,
  [UserRole.ADMIN]: 90,
  [UserRole.FINANCE_ADMIN]: 80,
  [UserRole.CONTENT_EDITOR]: 70,
  [UserRole.EVENT_MANAGER]: 70,
  [UserRole.IMAM]: 65,
  [UserRole.TEACHER]: 60,
  [UserRole.VOLUNTEER]: 50,
  [UserRole.PARENT]: 30,
  [UserRole.STUDENT]: 20,
  [UserRole.MEMBER]: 10,
  [UserRole.GUEST]: 5,
};

/**
 * Human-readable labels for each role
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.FINANCE_ADMIN]: 'Finance Admin',
  [UserRole.CONTENT_EDITOR]: 'Content Editor',
  [UserRole.EVENT_MANAGER]: 'Event Manager',
  [UserRole.IMAM]: 'Imam',
  [UserRole.TEACHER]: 'Teacher',
  [UserRole.VOLUNTEER]: 'Volunteer',
  [UserRole.PARENT]: 'Parent',
  [UserRole.STUDENT]: 'Student',
  [UserRole.MEMBER]: 'Member',
  [UserRole.GUEST]: 'Guest',
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Full system access with ability to manage all settings and users',
  [UserRole.ADMIN]: 'Administrative access to manage most system features',
  [UserRole.FINANCE_ADMIN]: 'Manage donations, financial reports, and donor information',
  [UserRole.CONTENT_EDITOR]: 'Create and manage content, announcements, and media',
  [UserRole.EVENT_MANAGER]: 'Create and manage events, registrations, and attendees',
  [UserRole.IMAM]: 'Religious leadership role with sermon and program management',
  [UserRole.TEACHER]: 'Manage assigned courses, attendance, and student progress',
  [UserRole.VOLUNTEER]: 'Limited administrative access for volunteer activities',
  [UserRole.PARENT]: 'View and manage enrolled children\'s information',
  [UserRole.STUDENT]: 'Access enrolled programs and courses',
  [UserRole.MEMBER]: 'Registered community member with basic access',
  [UserRole.GUEST]: 'Limited access for unregistered users',
};

/**
 * Roles that have admin panel access
 */
export const ADMIN_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.FINANCE_ADMIN,
  UserRole.CONTENT_EDITOR,
  UserRole.EVENT_MANAGER,
];

/**
 * Roles that are considered staff
 */
export const STAFF_ROLES: UserRole[] = [
  ...ADMIN_ROLES,
  UserRole.IMAM,
  UserRole.TEACHER,
  UserRole.VOLUNTEER,
];

/**
 * Roles that can manage programs and courses
 */
export const PROGRAM_MANAGER_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.IMAM,
  UserRole.TEACHER,
];

/**
 * Roles that can manage donations
 */
export const FINANCE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.FINANCE_ADMIN,
];

/**
 * Roles that can manage content
 */
export const CONTENT_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.CONTENT_EDITOR,
  UserRole.IMAM,
];

/**
 * Check if a user role has at least the privileges of a required role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if a role has admin access
 */
export function isAdmin(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

/**
 * Check if a role is staff
 */
export function isStaff(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}

/**
 * Check if a role can manage finances
 */
export function canManageFinances(role: UserRole): boolean {
  return FINANCE_ROLES.includes(role);
}

/**
 * Check if a role can manage content
 */
export function canManageContent(role: UserRole): boolean {
  return CONTENT_ROLES.includes(role);
}

/**
 * Check if a role can manage programs
 */
export function canManagePrograms(role: UserRole): boolean {
  return PROGRAM_MANAGER_ROLES.includes(role);
}

/**
 * Get all roles that a given role can assign to others
 * (can only assign roles lower in hierarchy)
 */
export function getAssignableRoles(role: UserRole): UserRole[] {
  const userLevel = ROLE_HIERARCHY[role];
  return Object.entries(ROLE_HIERARCHY)
    .filter(([_, level]) => level < userLevel)
    .map(([r]) => r as UserRole);
}

