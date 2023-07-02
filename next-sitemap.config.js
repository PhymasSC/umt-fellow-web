module.exports = {
  siteUrl: 'https://www.umtfellow.social',
  generateRobotsTxt: true,
  exclude: ['/api/*'], // Exclude any specific routes from the sitemap
  // Add any additional configuration options here
  // You can use the `trailingSlash` option to add trailing slashes to URLs
  trailingSlash: true,
  // Specify the paths to your individual pages
  // You can use the `exclude` option to exclude specific pages from the sitemap
  // Make sure to include all your pages, including dynamic routes
  // For example:
  pages: [
    '/',
    '/404',
    '/_app',
    '/_document',
    '/api/auth/[...nextauth]',
    '/api/createTokenRequest',
    '/api/graphql',
    '/api/messages/create-channel',
    '/api/messages/create-message',
    '/api/otp',
    '/api/reset-link',
    '/api/reset-password',
    '/api/sendmail',
    '/community/[id]',
    '/community/index',
    '/contact-us',
    '/explore',
    '/index',
    '/login',
    '/message/[[...id]]',
    '/notification',
    '/privacy-policy',
    '/profile/[id]',
    '/register',
    '/reset-password',
    '/setting/index',
    '/terms-and-conditions',
    '/thread/[[...id]]',
  ],
  sitemapSize: 7000,
};
