const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     register: true,
//     scope: '/',
//   }
// })
module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* config options here */
})
