# 🚀 DEPLOYMENT INSTRUCTIONS

## ⚠️ IMPORTANT: Clean Up First

Before deploying, you need to **DELETE** the old `/App.tsx` file from your project root directory. You should only have `/src/App.tsx`.

**Manual steps:**
1. In your project folder, delete the file `App.tsx` (the one in the root, NOT the one in the `src` folder)
2. Keep only `src/App.tsx`

## 🛠️ GitHub Desktop Setup

### Step 1: Create Repository
1. **Click the blue "Add repository" button** in GitHub Desktop
2. **Click "create a repository"** when prompted
3. Fill in:
   - **Name:** `grocery-comparison-app`
   - **Description:** `Slovak grocery price comparison and recipe sharing app`
   - **✅ Initialize with README** (check this box)
   - **✅ Make Public** (for free deployment)
4. **Click "Create Repository"**

### Step 2: Commit Your Files
1. After creating, you should see many files in the "Changes" tab
2. **Summary:** `Initial commit - Slovak grocery app with recipes and price comparison`
3. **Click "Commit to main"**
4. **Click "Publish repository"**

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import** your `grocery-comparison-app` repository
5. **Settings should auto-detect:**
   - Framework: Vite ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
6. **Click "Deploy"** 🚀

## ✅ Expected Result
- Your app will be live at: `https://grocery-comparison-app-[your-username].vercel.app`
- Automatic deployments on every GitHub push
- Mobile-responsive Slovak grocery comparison app

## 🎯 Total Time: ~10 minutes

If you encounter any issues, the most common problem is having the old `App.tsx` file in the root directory. Make sure to delete it first!