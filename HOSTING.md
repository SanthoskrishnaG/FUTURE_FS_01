# 🚀 Comprehensive Hosting & Deployment Guide — Next.js Portfolio

This guide provides step-by-step instructions to host and deploy your **Next.js 14 Full-Stack Portfolio** across different cloud platforms.

---

## 🌟 Option 1: Deploy on Vercel (Recommended — Free & 1-Click)

Vercel is the creator of Next.js and provides the easiest, fastest hosting platform with free custom domain support, global CDN, and automated CI/CD directly from GitHub.

### Step 1: Push Code to GitHub
1. Initialize Git in your project folder (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Migrate portfolio to Next.js 14 App Router"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect your local repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gsk-portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [Vercel](https://vercel.com) and log in or sign up with your **GitHub account**.
2. Click **"Add New..."** &rarr; **"Project"**.
3. Import your `gsk-portfolio` repository.
4. Keep the default settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
5. *(Optional)* Add Environment Variables for Email Notifications:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `your-email@gmail.com`
   - `SMTP_PASS`: `your-gmail-app-password`
   - `NOTIFICATION_EMAIL`: `santhoskrishnag@gmail.com`
6. Click **"Deploy"**.
7. Vercel will automatically build and deploy your portfolio in ~60 seconds. You will receive a live URL (e.g. `https://gsk-portfolio.vercel.app`).

---

## ⚡ Option 2: Deploy on Netlify

Netlify is another popular free hosting platform for Next.js applications.

### Steps:
1. Push your repository to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/).
3. Click **"Add new site"** &rarr; **"Import an existing project"**.
4. Select **GitHub** and choose your repository.
5. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
6. Click **"Deploy Site"**.

---

## 🏢 Option 3: Deploy on Render / Railway (Persistent Node.js Server)

If you strictly want to store contact submissions in a local `data/contacts.json` file rather than via email notifications, Render or Railway provides a persistent Node.js runtime.

### Steps for Render:
1. Push code to GitHub.
2. Log in to [Render](https://render.com/).
3. Click **"New +"** &rarr; **"Web Service"**.
4. Connect your GitHub repository.
5. Configure Settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
6. Choose the **Free Plan** and click **"Create Web Service"**.

---

## 🖥️ Option 4: Deploy on VPS / Ubuntu (PM2 + Nginx)

If hosting on a Linux Virtual Private Server (DigitalOcean, AWS EC2, Linode, Hostinger):

### Step 1: Server Setup
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx
sudo npm install -g pm2
```

### Step 2: Clone & Build
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/gsk-portfolio.git
cd gsk-portfolio
npm install
npm run build
```

### Step 3: Run with PM2
```bash
pm2 start npm --name "gsk-portfolio" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Nginx Reverse Proxy
Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Reload Nginx:
```bash
sudo systemctl reload nginx
```

---

## 🧪 Local Testing & Verification

To verify your Next.js application locally before deploying:

```bash
# Install dependencies
npm install

# Run local development server
npm run dev
# Open http://localhost:3000 in your browser

# Build production bundle
npm run build

# Start production server locally
npm run start
```

---

## 📌 Summary Checklist Before Launch
- [x] Converted full project into Next.js 14 App Router with TypeScript.
- [x] Preserved 100% of Glassmorphic UI design, dark/light theme toggle, custom cursor, and canvas particles.
- [x] Next.js Route Handlers configured for `/api/contact` and `/api/info`.
- [x] Interactive Resume page served at `/resume`.
- [x] Ready to push to GitHub & deploy on Vercel/Netlify.
