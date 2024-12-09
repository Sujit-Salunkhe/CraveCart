/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns:[
        {
          protocol:'https',
          hostname:'plus.unsplash.com'
        },
        {
          protocol:'https',
          hostname:'images.pexels.com'
        }
      ],  
    },
    experimental: {
      optimizePackageImports: ["@chakra-ui/react"],
    }
  };
  
  export default nextConfig;
  
  
