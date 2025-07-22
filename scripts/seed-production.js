#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Seeding production database...');
console.log('Make sure you have set the DATABASE_URL environment variable to your Neon database URL');

try {
  // Change to project directory
  process.chdir(path.join(__dirname, '..'));
  
  // Run Prisma migrations
  console.log('📦 Running migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Run seed script
  console.log('🌱 Running seed script...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  
  console.log('✅ Database seeded successfully!');
} catch (error) {
  console.error('❌ Error seeding database:', error.message);
  process.exit(1);
} 