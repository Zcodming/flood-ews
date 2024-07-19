/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
	},
	// output: { export: any },
};

module.exports = nextConfig;
