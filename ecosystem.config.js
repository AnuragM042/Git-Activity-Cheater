module.exports = {
  apps: [
    {
      name: "automation",
      script: "./automation.js",
      cron_restart: "0 */2 * * *", // Every 3 hours
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
