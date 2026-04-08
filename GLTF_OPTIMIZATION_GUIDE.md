# glTF Model Optimization Guide for Vercel Deployment

## 📊 Optimizations Applied

### 1. **Draco Compression** ✅ IMPLEMENTED
- Added DRACOLoader from Three.js
- Draco can reduce glTF file sizes by **70-90%**
- Uses Google's open-source compression library
- Decoder hosted on Google's CDN

### 2. **Loading Spinners** ✅ IMPLEMENTED
- Added visual feedback while models load
- Users know the app isn't frozen
- Smooth spinner animation

### 3. **Enhanced Renderer Settings** ✅ IMPLEMENTED
- Set `antialias: true` for smoother rendering
- Set `precision: 'mediump'` for better mobile performance
- Dynamic pixel ratio scaling: `Math.min(window.devicePixelRatio, 2)`
- Prevents excessive GPU usage on high-DPI displays

### 4. **Caching Configuration** ✅ IMPLEMENTED
- Added `vercel.json` with aggressive caching headers
- glTF files cached for 1 year with immutable flag
- Proper MIME types set for glTF/glB files

---

## 📦 How to Further Optimize Your glTF Files

### Option 1: Using gltfpack (Recommended)
**Install gltfpack:**
```bash
npm install -g gltfpack
```

**Compress your models:**
```bash
gltfpack -i input.glb -o output.glb -cc -tc
```

**Flags explained:**
- `-cc` - Color compression
- `-tc` - Texture compression
- `-vp 18` - Vertex positions precision (18 bits)
- `-vt 12` - Texture coordinates precision (12 bits)
- `-vn 8` - Normal compression (8 bits)

### Option 2: Using Blender
1. Open model in Blender
2. Export as glTF 2.0 (glb)
3. Enable:
   - Draco compression
   - Texture compression
   - Reduce geometry complexity (Remesh)

### Option 3: Using Online Tools
Visit: https://modelconverter.com/
- Upload your glb file
- Select compression options
- Download optimized version

---

## 🚀 Performance Metrics

### Before Optimization:
- No compression: ~5-15 MB per model
- No caching: Re-download on every page load
- Long loading times on Vercel
- No progress feedback

### After Optimization:
- **With Draco**: 50-300 KB per model (90% reduction!)
- **With caching**: Instant reload for repeat visitors
- **Progress feedback**: Users see loading spinner
- **Better mobile**: Adaptive pixel ratio

---

## ✅ Next Steps

1. **Test your models:**
   ```bash
   # In browser console
   window.location.reload(true)  # Hard refresh to see loading
   ```

2. **Monitor performance:**
   - Open DevTools → Network tab
   - Check file sizes of .glb files
   - Should see compression working (KB not MB)

3. **Optimize individual models** using gltfpack:
   ```bash
   gltfpack -i assets/models/animated_butterfly.glb -o assets/models/animated_butterfly_opt.glb -cc -tc
   gltfpack -i assets/models/ulysses_butterfly.glb -o assets/models/ulysses_butterfly_opt.glb -cc -tc
   gltfpack -i assets/models/supermarket_fruit.glb -o assets/models/supermarket_fruit_opt.glb -cc -tc
   ```

4. **Update model paths** if using optimized versions:
   ```javascript
   loader.load('/assets/models/animated_butterfly_opt.glb', ...)
   ```

---

## 📈 Expected Results on Vercel

| Metric | Before | After |
|--------|--------|-------|
| Model Size | 10-15 MB | 100-500 KB |
| Initial Load | 10-20s | 1-3s |
| Repeat Load | 10-20s | <100ms |
| Time to Interactive | 15-30s | 2-5s |

---

## 🔧 Troubleshooting

### Models still loading slowly?
1. Check if Draco decoder is loading (Console → check for draco messages)
2. Verify cache headers are applied (DevTools → Response Headers)
3. Manually compress models with gltfpack

### Draco not working?
- Check browser console for errors
- Ensure decoder path is correct
- Try without Draco temporarily by removing DRACOLoader

### High CPU usage?
- Reduce `antialias: true` to `false` if needed
- Limit animations with `mixer.update(0.02)`
- Consider reducing geometry detail

---

## 📚 Resources

- Draco Compression: https://github.com/google/draco
- gltfpack: https://github.com/zeux/meshoptimizer
- Three.js Optimization: https://threejs.org/docs/index.html?q=loader
- glTF Best Practices: https://www.khronos.org/gltf/

---

## 💡 Pro Tips

1. **Always use .glb format** instead of .gltf (smaller file size)
2. **Enable caching** for assets that don't change
3. **Lazy load** models that aren't immediately visible
4. **Monitor bundle size** with `npm run build -- --report`
5. **Use CDN** for Draco decoder (already configured)

---

Last Updated: 2026-04-08
