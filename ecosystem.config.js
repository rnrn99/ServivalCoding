module.exports = {
  apps : [{
    name: "backend",
    script: "npm",
    args: "run start:server",
    cwd: "./back",
  }, {
    name: "frontend",
    script: "serve",
    args: "-s build",
    cwd: "./front",
  }]
}
