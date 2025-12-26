# Deploying to Netlify

1. **Push your code to GitHub (or another Git provider).**
2. **Go to [Netlify](https://app.netlify.com/) and create a new site from Git.**
3. **Connect your repository.**
4. **Set the build command:**
   
   ```
   npm run build
   ```
   
   **Set the publish directory:**
   
   ```
   dist
   ```
5. **Netlify will detect the `netlify.toml` file and handle redirects for SPA routing.**
6. **Click 'Deploy site'.**

Your Vite React app will be deployed and accessible via the Netlify URL provided after deployment.

---

**Local Testing:**
- You can run `npm run build` and then `npm run preview` to test the production build locally before deploying.
