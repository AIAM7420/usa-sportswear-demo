import { defineConfig } from "@playwright/test";
const productionUrl = process.env.E2E_BASE_URL;
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: productionUrl ? 180000 : 60000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: productionUrl || "http://localhost:3000",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  webServer: productionUrl ? undefined : {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
