# BD Shop

Production notes

- Set environment variables on the server:
  - `PORT=4000`
  - `MONGODB_URI=mongodb+srv://...`
  - `JWT_SECRET=generate_a_strong_secret`
  - `CORS_ORIGIN=https://yourdomain.com`
  - `SITE_URL=https://yourdomain.com`
  - `SSLCZ_STORE_ID=...` (if using SSLCommerz)
  - `SSLCZ_STORE_PASSWD=...` (if using SSLCommerz)
- Run `npm run build` at root; serve `client/dist` via CDN/static hosting.
- Run server with a process manager (PM2/systemd) or Docker.
