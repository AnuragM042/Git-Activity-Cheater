module.exports = {
  apps: [
    {
      name: "automation",
      script: "./automation.js",
      cron_restart: "0 */1 * * *", // Every 1 hours
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
