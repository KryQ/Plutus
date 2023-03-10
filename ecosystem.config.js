module.exports = {
  apps: [
    {
      name: "Backend",
      script: "./backend/index.js",
      autorestart: true,
      max_memory_restart: "300M",
    },
  ],
};
