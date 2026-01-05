# Deployment Guide for Campus360

This guide will help you deploy Campus360 to show it to your professor.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest and fastest way to deploy your React/Vite application.

### Steps:

1. **Install Vercel CLI** (if you prefer command line):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website** (Easier):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub (recommended) or email
   - Click "Add New Project"
   - Import your GitHub repository (or drag and drop your project folder)
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"
   - Your site will be live in 1-2 minutes!

3. **Deploy via Command Line**:
   ```bash
   # In your project directory
   vercel
   # Follow the prompts
   ```

### Build Settings (Auto-detected by Vercel):
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Your app will be available at: `https://your-project-name.vercel.app`

---

## Option 2: Netlify

### Steps:

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/login** (GitHub recommended)
3. **Click "Add new site" → "Import an existing project"**
4. **Connect your GitHub repository** (or drag and drop)
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Click "Deploy site"**

Your app will be available at: `https://your-project-name.netlify.app`

---

## Option 3: GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/Campus360/', // Replace with your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

Your app will be available at: `https://your-username.github.io/Campus360/`

---

## Quick Deploy (Fastest Method)

### Using Vercel (Recommended):

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/Campus360.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
3. **Click "Add New Project"**
4. **Import from GitHub**
5. **Select your repository**
6. **Click "Deploy"** (no configuration needed!)

**That's it!** Your app will be live in under 2 minutes.

---

## Important Notes:

- **Environment Variables**: If you add any `.env` variables later, add them in Vercel/Netlify dashboard under project settings
- **Custom Domain**: You can add a custom domain later in project settings
- **Auto-deploy**: Every push to your main branch will automatically deploy
- **Preview Deployments**: Pull requests get their own preview URLs

---

## Testing Before Deployment:

1. **Build locally** to make sure everything works:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for errors** in the build output

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html

