import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
	// fixes wallet connect dependency issue
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's2.coinmarketcap.com',
			},
			{
				protocol: 'https',
				hostname: 'wary-raccoon-546.convex.cloud',
			}
		],
	},
};

export default nextPwa({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development', // Disable PWA in development
})(nextConfig);
