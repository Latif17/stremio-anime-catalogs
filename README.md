# Stremio Addon for Anime Catalogs

Stremio catalogs for anime from: MyAnimeList, AniDB, AniList, Kitsu. Supports filtering by dubbed content and optional RPDB (Rating Poster Database) integration.

## 🚀 Quick Start (Live Deployment)

The easiest way to use this addon is via our live deployment. 
You can configure and install it directly into your Stremio app by visiting:

👉 **[Configure Addon (Live)](https://stremio-anime-catalogs.vercel.app/configure)**

---

## 🛠️ Fork and Self-Host

If you prefer to run your own instance of this addon (for example, to make modifications or ensure high availability), you can easily fork and self-host it.

### Option 1: Deploy to Vercel (Recommended)

This project is optimized for deployment on Vercel.

1. **Fork this repository** to your own GitHub account.
2. Log in to [Vercel](https://vercel.com/) and create a **New Project**.
3. Import your forked GitHub repository.
4. Vercel will automatically detect the `vercel.json` configuration and deploy the Node.js serverless functions.
5. Once deployed, visit `https://<your-vercel-deployment-url>/configure` to configure and install your self-hosted addon into Stremio.

### Option 2: Run Locally (For Development)

To run the addon on your own machine:

1. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/stremio-anime-catalogs.git
   cd stremio-anime-catalogs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The addon will typically run on `http://localhost:7090`. You can configure it by visiting `http://localhost:7090/configure` in your browser.

## 📝 Features

- Fetches up-to-date anime catalogs from popular sources (MyAnimeList, AniDB, AniList, Kitsu).
- Easily customizable through the `/configure` page.
- Supports **Rating Poster Database (RPDB)** poster ratings (requires RPDB API Key).