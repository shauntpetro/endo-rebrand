# EndoRebrand

EndoCyclic Therapeutics rebrand website built with Next.js.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create a production build:

```bash
npm run build
npm start
```

## Deployment

### Deploy to Railway

This project is configured for deployment on [Railway](https://railway.app).

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `endo-rebrand` (or your preferred name)
   - **Do not** initialize with README, .gitignore, or license (we already have these)

2. **Update Git Remote**
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/endo-rebrand.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

3. **Deploy on Railway**
   - Go to [Railway](https://railway.app) and sign in
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `endo-rebrand` repository
   - Railway will automatically detect Next.js and deploy
   - Your app will be live at a `*.railway.app` domain

4. **Environment Variables** (if needed)
   - Add any environment variables in Railway's project settings
   - Railway will automatically rebuild when you push to GitHub

## Tech Stack

- **Framework:** Next.js 16
- **React:** 19.2.0
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js, React Three Fiber
- **Animation:** GSAP, Framer Motion
- **TypeScript:** Full type safety

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Railway Documentation](https://docs.railway.app)
