# Project Reorganization Checklist

## Status: Directories Created ✅

### Phase 1: Backend Organization
- [ ] Move `server.js` to `backend/server.js`
- [ ] Move `app.js` to `backend/app.js` (or extract business logic)
- [ ] Create database models in `backend/models/`
  - [ ] User model
  - [ ] Product model
  - [ ] Cart model
  - [ ] Order model
- [ ] Create API routes in `backend/routes/`
  - [ ] `auth.js` - authentication endpoints
  - [ ] `products.js` - product endpoints
  - [ ] `cart.js` - cart endpoints
- [ ] Create middleware in `backend/middleware/`
  - [ ] Authentication middleware
  - [ ] Error handling middleware

### Phase 2: Frontend Static Files
- [ ] Move HTML files to `frontend/pages/`
  - [ ] `index.html` (main butterfly page)
  - [ ] `login.html`
  - [ ] `car.html` → rename to `cart.html`
  - [ ] `pation.html` → rename/reorganize
- [ ] Move CSS files to `frontend/styles/`
  - [ ] Consolidate `buy.css`, `score.css`, `style.css`
  - [ ] Create unified stylesheet
  - [ ] Move `loginc.css` to login-specific
- [ ] Move JS files to `frontend/js/`
  - [ ] `app.js` (Three.js animation)
  - [ ] `loginj.js` → rename to `auth.js`
  - [ ] `cart.js` → cart logic
  - [ ] `basket.js` → basket logic
  - [ ] `spider.js` → utilities
  - [ ] `demo.js` → demo content
  - [ ] `script.js` → general scripts

### Phase 3: Assets Organization
- [ ] Move 3D Models to `frontend/assets/models/`
  - [ ] ✅ `animated_butterfly.glb` (Main butterfly)
  - [ ] ✅ `lykan_hypersports_car.glb`
  - [ ] ✅ `2023_bugatti_chiron_profilee.glb`
  - [ ] ✅ `supermarket_fruit.glb`
  - [ ] ✅ `champagne_set.obj`
  - [ ] ✅ `ulysses_butterfly.glb`
  - [ ] ✅ `demon_bee_full_texture.glb`
  - [ ] ✅ `scene.gltf`
- [ ] Move Images to `frontend/assets/images/`
  - [ ] ✅ Profile: `ju2j_ohg4_210607-removebg-preview.png`
  - [ ] ✅ UI icons: `checked_green.png`, `checked_red.png`, `iconCart.png`
  - [ ] ✅ Backgrounds: `bg.png`, `file.png`
  - [ ] ✅ Logo: `logo.png`
  - [ ] ✅ Models preview: `model.png`
  - [ ] ✅ Thumbnails: `fruit 1.png` through `fruit 10.png`
  - [ ] ✅ Other: `10998653-fotor-bg-remover-20240926124022.png`
- [ ] Move Videos to `frontend/assets/videos/`
  - [ ] ✅ `2583475-hd_1920_1080_24fps.mp4`
- [ ] Move Data to `frontend/assets/data/`
  - [ ] ✅ `products.json`

### Phase 4: Cleanup
- [ ] Delete `Unconfirmed 431573.crdownload` (incomplete download)
- [ ] Remove empty or duplicate style files
- [ ] Remove duplicate asset files
- [ ] Remove temporary/demo files

### Phase 5: Configuration Updates
- [ ] Update all file paths in `app.js` for butterfly animation
- [ ] Update all file paths in HTML files for assets
- [ ] Update all imports/requires in JS files
- [ ] Update `package.json` with correct entry points
- [ ] Create `.env` file for configuration
- [ ] Create `.gitignore` for node_modules, .env, etc.

### Phase 6: Documentation
- [ ] ✅ Create `PROJECT_STRUCTURE.md`
- [ ] ✅ Create `CLEANUP_CHECKLIST.md`
- [ ] Create `SETUP_GUIDE.md`
- [ ] Update root `README.md`
- [ ] Add inline code comments for complex logic

---

## Quick Stats

### Current State
- **HTML files**: 5 (scattered)
- **CSS files**: 7 (scattered)
- **JavaScript files**: 8 (mixed frontend/backend)
- **3D Models**: 7 GLB/GLTF files
- **Images**: 20+ PNG/JPG files
- **Total files to organize**: 50+

### After Reorganization
- **Backend**: `/backend` - server logic only
- **Frontend**: `/frontend` - presentations & clients
- **Assets**: `/frontend/assets` - organized by type
- **Styles**: `/frontend/styles` - all CSS centralized
- **Data**: `/frontend/assets/data` - configuration files

---

## File Path Update Examples

### Before
```
app.js                          → app.js (line 1: loads 'animated_butterfly.glb')
```

### After
```
frontend/js/app.js              → app.js (line 1: loads '../assets/models/animated_butterfly.glb')
```

---

## Important Notes

1. **Butterfly Animation** is the star feature - ensure `animated_butterfly.glb` path is updated everywhere
2. **Backend/Frontend separation** - decide: keep as monolith or split into separate deployments?
3. **Environment setup** - MongoDB must be running on `localhost:27017`
4. **Port configuration** - Currently using port 3000, can be changed in `package.json`
5. **Static file serving** - Express serves everything from root currently, will need route updates

---

## Testing After Reorganization

```bash
# 1. Start MongoDB
mongod

# 2. Install dependencies
npm install

# 3. Start server
npm run dev

# 4. Open browser to:
http://localhost:3000/frontend/pages/index.html
# Should see butterfly animation!

# 5. Test features:
- Login page
- Shopping cart
- Product listing
- Animation interactions
```

---

## Estimated Effort

| Phase | Time | Priority |
|-------|------|----------|
| Phase 1 | 30 min | HIGH |
| Phase 2 | 45 min | HIGH |
| Phase 3 | 20 min | MEDIUM |
| Phase 4 | 10 min | LOW |
| Phase 5 | 30 min | HIGH |
| Phase 6 | 15 min | MEDIUM |
| **Total** | **2.5 hrs** | - |

