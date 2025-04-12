module.exports = {
  siteUrl: 'https://asterixhdev.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  excludes: ['/admin/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://asterixhdev.vercel.app/sitemap-0.xml',
    ],
  },
}