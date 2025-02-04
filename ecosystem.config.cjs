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
			path: "/srv/www/chee.party/cherries/",
			"pre-deploy-local": "echo yay",
			"post-deploy":
				"npm install && cp astro.db .. && npm run build -- --outDir=new && cp ../astro.db . && rm -rf old && mv dist old && mv new dist && rm -rf old && pm2 reload ecosystem.config.cjs --env production",
			"pre-setup": "echo yay",
		},
	},
}
