module.exports = {
	apps: [
		{
			script: "dist/server/entry.js",
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
			key: "www-key",
			user: "www",
			host: "chee.party",
			ref: "origin/main",
			repo: "https://gitlab.com/chee/cherries.git/",
			path: "/srv/www/cherries/",
			"pre-deploy-local": "echo yay",
			"post-deploy":
				"npm install && npm run build && pm2 reload ecosystem.config.cjs --env production",
			"pre-setup": "echo yay",
		},
	},
}
