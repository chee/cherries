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
	},
	env_development: {
		NODE_ENV: "development",
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
				"npm install && npm run build -- --outDir=new && rm -rf old && mv dist old && mv new dist && mv old/astro.db new && rm -r old && pm2 reload ecosystem.config.cjs --env production",
			"pre-setup": "echo yay",
		},
	},
}
