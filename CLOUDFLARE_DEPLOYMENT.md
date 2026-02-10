# Cloudflare Pages Deployment Guide

## Prerequisites

1. A Cloudflare account (you have a free one)
2. A GitHub repository (this repo)
3. Your PostgreSQL database credentials (external service like Railway, Supabase, Neon, etc.)

## Step 1: Database Setup

Since Cloudflare Pages is serverless, your PostgreSQL database must be hosted externally. If you don't have one yet, consider:

- **Supabase** (PostgreSQL with auth) - Free tier available
- **Railway** (PostgreSQL) - Free tier available
- **Neon** (PostgreSQL) - Free tier available
- **Planet Scale** (MySQL) - Free tier available

Make note of your database connection string (will look like: `postgresql://user:password@host:port/dbname`)

## Step 2: Connect Your GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** (left sidebar)
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select the `my-tutor-app` repository
7. Click **Begin setup**

## Step 3: Configure Build Settings

When prompted for build settings:

- **Framework preset**: Select **Next.js**
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (leave as default)

Cloudflare should auto-detect these, but confirm they match.

## Step 4: Add Environment Variables

1. In the Pages project settings, go to **Settings** → **Environment variables**
2. Add the following variables for **Production**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

If you have other environment variables (.env file), add them here as well.

## Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will automatically:
   - Pull your code
   - Run `npm run build`
   - Deploy the built application
3. You'll get a deployment URL (something like: `my-tutor-app.pages.dev`)

## Step 6: Configure Domain (Optional)

1. If you own a domain, go to **Custom domains** in your Pages project
2. Add your domain
3. Follow Cloudflare's DNS instructions

## Troubleshooting

### Build Fails
- Check the build logs in Cloudflare Pages
- Ensure all dependencies in `package.json` are correct
- Run `npm install` locally and verify `npm run build` works

### Database Connection Issues
- Verify your `DATABASE_URL` is set correctly in environment variables
- Check that your database allows connections from Cloudflare's IP addresses
- Test connection string locally: `npm run dev`

### Static Assets Not Loading
- Verify Next.js is serving static files correctly
- Check the `.next/static` folder is being built

## Updates & Redeployment

After setting up the integration:
- Every push to your main branch automatically triggers a new deployment
- You can also manually trigger deployments from the Cloudflare Pages dashboard

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Deploying Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/next/)
- [Prisma with Cloudflare](https://www.prisma.io/docs/orm/overview/databases/edge-databases)
