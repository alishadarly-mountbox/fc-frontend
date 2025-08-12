const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized build process...');

// Set environment variables for build optimization
process.env.GENERATE_SOURCEMAP = 'false';
process.env.INLINE_RUNTIME_CHUNK = 'false';
process.env.SKIP_PREFLIGHT_CHECK = 'true';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

try {
  // Clean previous build
  if (fs.existsSync(path.join(__dirname, 'build'))) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync(path.join(__dirname, 'build'), { recursive: true, force: true });
  }

  // Run build command
  console.log('🔨 Building with optimizations...');
  execSync('npx craco build', { 
    stdio: 'inherit',
    env: process.env,
    cwd: __dirname
  });

  console.log('✅ Build completed successfully!');
  
  // Check build size
  const buildPath = path.join(__dirname, 'build');
  if (fs.existsSync(buildPath)) {
    const stats = fs.statSync(buildPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📦 Build size: ${sizeInMB} MB`);
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
