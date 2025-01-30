/**@type {import('next').NextConfig}*/

import { hostname } from 'os';

const nextConfig= {
  images:{
    remotePatterns:[
      {hostname:"confident-monitor-488.convex.cloud"},
   
    ]
  }
};

export default nextConfig;



