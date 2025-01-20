module.exports = {
	apps: [
		{
			name: "cherries",
			script: "dist/server/entry.mjs",
			watch: ".",
		},
	],

	env_production: {
		NODE_ENV: "production",
		ASTRO_DATABASE_FILE: "prod.db",
	},
	env_development: {
		NODE_ENV: "development",
		ASTRO_DATABASE_FILE: "dev.db",
	},

	deploy: {
		production: {
			user: "www",
			host: "chee.party",
			ref: "origin/main",
			repo: "https://gitlab.com/chee/cherries.git/",
			path: "/srv/www/cherries/",
			"pre-deploy-local": "echo yay",
			"post-deploy":
				"npm install && npm run build -- --outDir=new && mv dist old && mv new dist && rm -r old && pm2 reload ecosystem.config.cjs --env production",
			"pre-setup": "echo yay",
		},
	},
}
