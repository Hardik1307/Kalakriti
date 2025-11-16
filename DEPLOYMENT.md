# Deployment Guide - Kalakriti

## 📦 Pre-Deployment Checklist

- [x] All pages tested and working
- [x] No console errors or warnings
- [x] Responsive design verified
- [x] All features functional
- [x] Code cleaned (no debug logs)
- [x] Dependencies up to date

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/kalakriti-react",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default {
     base: '/kalakriti-react/'
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Build Configuration

### Vite Config (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

## 📊 Performance Optimization

### Before Deployment
1. **Optimize Images**
   - Compress all images
   - Use WebP format where possible
   - Implement lazy loading

2. **Code Splitting**
   - Already implemented with React.lazy()
   - Verify chunk sizes after build

3. **Minification**
   - Enabled by default in production build
   - CSS and JS are automatically minified

## 🌐 Environment Variables

If you add backend integration, create `.env` file:

```env
VITE_API_URL=https://api.kalakriti.com
VITE_STRIPE_KEY=your_stripe_key
VITE_ANALYTICS_ID=your_analytics_id
```

## 📱 Testing Before Deployment

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Test on different devices**
   - Desktop (Chrome, Firefox, Safari)
   - Tablet (iPad, Android)
   - Mobile (iOS, Android)

## 🔒 Security Considerations

- All sensitive operations use localStorage (client-side only)
- No API keys exposed in frontend code
- HTTPS enforced on deployment platform
- Content Security Policy headers configured

## 📈 Post-Deployment

1. **Monitor Performance**
   - Use Lighthouse for performance audits
   - Check Core Web Vitals
   - Monitor loading times

2. **Analytics Setup**
   - Google Analytics
   - User behavior tracking
   - Conversion tracking

3. **SEO Optimization**
   - Add meta tags
   - Create sitemap.xml
   - Submit to search engines

## 🐛 Troubleshooting

### Build Fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Images Not Loading
- Check image paths are relative
- Verify images are in public folder
- Check build output includes images

### Routing Issues
- Ensure deployment platform supports SPA routing
- Add _redirects file for Netlify
- Configure vercel.json for Vercel

## 📞 Support

For deployment issues, check:
- Vite documentation: https://vitejs.dev/
- React Router docs: https://reactrouter.com/
- Platform-specific guides (Vercel, Netlify, etc.)

---

**Ready for Production!** 🎉
