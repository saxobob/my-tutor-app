# Migration from Netlify to Cloudflare Pages

Since you already have Supabase configured, this is a quick migration guide.

## Step 1: Get Your Supabase DATABASE_URL

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Find the **Connection string** section
5. Copy the **PostgreSQL** connection string (it looks like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)
6. Keep this ready for the next step

## Step 2: Connect GitHub to Cloudflare Pages

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the left sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare with your GitHub account
6. Find and select the **my-tutor-app** repository
7. Click **Begin setup**

## Step 3: Configure Build Settings

On the build configuration page:
- **Framework preset**: Should auto-detect as **Next.js** ✓
- **Build command**: `npm run build` ✓
- **Build output directory**: `.next` ✓
- **Root directory**: `/` ✓

Click **Next** to proceed to environment variables.

## Step 4: Add Environment Variables

In the "Set up builds and deployments" section, add your environment variables:

1. **DATABASE_URL**: Paste your Supabase connection string from Step 1
2. **NODE_ENV**: `production`
3. Any other variables from your previous Netlify setup (if applicable)

## Step 5: Deploy

Click **Save and Deploy**. Cloudflare will:
- Clone your repository
- Install dependencies
- Run `npm run build`
- Deploy your Next.js app

Within a few minutes, your app will be live at: `my-tutor-app.pages.dev`

## Verify Everything Works

After deployment:
1. Check the **Deployments** tab to see build logs
2. Visit your live URL and test key functionality
3. Check that database queries work (if you have any API endpoints)

## Custom Domain (Optional)

If you had a custom domain on Netlify:
1. Go to **Pages** → **my-tutor-app** → **Custom domains**
2. Add your domain
3. Update DNS records if needed

## Rollback Plan

If you need to revert to Netlify:
- Keep Netlify branch/configuration for a few days
- Once you verify Cloudflare is stable, you can remove Netlify deployment

---

**You're all set!** Your Next.js app with Supabase will be deployed on Cloudflare Pages.
