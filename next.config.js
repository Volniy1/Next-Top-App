/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['courses-top.ru']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],

    });
    return config;
  }
};

module.exports = nextConfig;

// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//       },
//       use: ['@svgr/webpack'],
//     });
//     return config
//   }

// }

