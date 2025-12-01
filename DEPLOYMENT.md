# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `endo-rebrand` (or your preferred name)
3. Description: "EndoCyclic Therapeutics rebrand website"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize this repository with a README" (we already have one)
6. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the GitHub repository, run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd /Users/shauntpetrossian/Desktop/EndoRebrand
git remote add origin https://github.com/YOUR_USERNAME/endo-rebrand.git
git branch -M main
git push -u origin main
```

If you already have a remote, update it instead:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/endo-rebrand.git
git push -u origin main
```

## Step 3: Deploy to Railway

1. Go to https://railway.app and sign in (use GitHub to sign in)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub if prompted
5. Select your `endo-rebrand` repository
6. Railway will automatically:
   - Detect it's a Next.js project
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Start the server (`npm start`)
7. Your app will be live at a `*.railway.app` domain
8. You can add a custom domain in Railway's project settings

## Step 4: Environment Variables (if needed)

If your app needs environment variables:
1. Go to your Railway project
2. Click on your service
3. Go to the **Variables** tab
4. Add any required environment variables
5. Railway will automatically rebuild

## Continuous Deployment

Railway automatically deploys when you push to the `main` branch:
```bash
git add .
git commit -m "Your commit message"
git push
```

Railway will detect the push and automatically rebuild and redeploy your app.

## Troubleshooting

- **Build fails**: Check Railway logs in the project dashboard
- **App not loading**: Ensure `npm start` works locally after `npm run build`
- **Environment variables**: Make sure all required env vars are set in Railway

