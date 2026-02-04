export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting, missing semicolons, etc.
        'refactor', // Code restructuring
        'perf',     // Performance improvement
        'test',     // Adding tests
        'build',    // Build system or dependencies
        'ci',       // CI configuration
        'chore',    // Maintenance tasks
        'revert',   // Revert a commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'web',      // Frontend app
        'api',      // Backend app
        'shared',   // Shared package
        'config',   // Config package
        'db',       // Database/Prisma
        'auth',     // Authentication
        'cms',      // Content management
        'payments', // Stripe/donations
        'deps',     // Dependencies
        'release',  // Release related
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
  },
};
