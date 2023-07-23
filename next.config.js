/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
	},
	// output: { export: any },
};

module.exports = nextConfig;
