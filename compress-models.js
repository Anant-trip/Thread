#!/usr/bin/env node

/**
 * glTF Model Compression Tool
 * Compresses glTF/glB models using gltfpack for faster loading
 * 
 * Usage: node compress-models.js
 * 
 * Requirements:
 *   npm install -g gltfpack
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MODELS_DIR = path.join(__dirname, 'frontend', 'assets', 'models');
const EXTENSIONS = ['.glb', '.gltf'];

console.log('🚀 Starting glTF Model Compression...\n');

// Check if gltfpack is installed
try {
    execSync('gltfpack --version', { stdio: 'ignore' });
    console.log('✅ gltfpack is installed\n');
} catch (error) {
    console.error('❌ gltfpack not found!');
    console.error('Install it with: npm install -g gltfpack');
    process.exit(1);
}

// Get all glTF files
const files = fs.readdirSync(MODELS_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return EXTENSIONS.includes(ext);
});

if (files.length === 0) {
    console.log('No glTF files found in', MODELS_DIR);
    process.exit(0);
}

console.log(`Found ${files.length} model(s) to compress:\n`);

let successCount = 0;
let totalOriginalSize = 0;
let totalCompressedSize = 0;

files.forEach((file) => {
    const inputPath = path.join(MODELS_DIR, file);
    const outputPath = path.join(MODELS_DIR, `${path.parse(file).name}_compressed${path.extname(file)}`);
    
    try {
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;
        totalOriginalSize += originalSize;

        // Compress model
        console.log(`📦 Compressing: ${file}`);
        execSync(`gltfpack -i "${inputPath}" -o "${outputPath}" -cc -tc -vp 18 -vt 12 -vn 8`, {
            stdio: 'inherit'
        });

        // Get compressed file size
        const compressedStats = fs.statSync(outputPath);
        const compressedSize = compressedStats.size;
        totalCompressedSize += compressedSize;

        // Calculate reduction percentage
        const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(2);

        console.log(`✅ ${file}`);
        console.log(`   Before: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   After:  ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Saved:  ${reduction}%\n`);

        successCount++;
    } catch (error) {
        console.error(`❌ Failed to compress ${file}:`);
        console.error(error.message, '\n');
    }
});

console.log('='.repeat(50));
console.log(`✨ Compression Complete!\n`);
console.log(`Successfully compressed: ${successCount} / ${files.length} models`);
console.log(`Total original size:     ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total compressed size:   ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total reduction:         ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(2)}%`);
console.log('\n📝 Next step: Update your imports to use _compressed versions');
console.log('   Example: animated_butterfly_compressed.glb');
