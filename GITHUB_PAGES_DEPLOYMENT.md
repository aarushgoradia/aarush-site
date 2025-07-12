# GitHub Pages Deployment Guide

## 🚀 Simple 3-Step Deployment

### Step 1: Build Your Site
```bash
npm run build
```

### Step 2: Deploy to GitHub Pages
1. Create a new repository on GitHub (or use existing)
2. Upload the **entire contents** of the `dist` folder to your repository
3. Make sure `index.html` is in the root of your repository

### Step 3: Enable GitHub Pages
1. Go to your repository settings
2. Navigate to **Pages** section
3. Select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

## 🌐 Custom Domain (Optional)
If you want to use `aarushgoradia.com`:
1. In your repository settings → Pages
2. Add your custom domain in the **Custom domain** field
3. Configure your domain's DNS to point to GitHub Pages

## 📝 Future Updates
- Edit your site files
- Run `npm run build` 
- Upload the new `dist` folder contents
- Changes will be live in a few minutes!

## 🔧 Quick Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

That's it! Your site is now live on GitHub Pages! 🎉
