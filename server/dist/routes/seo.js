"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/robots.txt', (_req, res) => {
    res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: ${process.env.SITE_URL || 'http://localhost:5173'}/sitemap.xml`);
});
router.get('/sitemap.xml', (_req, res) => {
    const site = process.env.SITE_URL || 'http://localhost:5173';
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc></url>
  <url><loc>${site}/products</loc></url>
</urlset>`;
    res.type('application/xml').send(xml);
});
exports.default = router;
//# sourceMappingURL=seo.js.map