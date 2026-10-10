import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--remote-debugging-port=9224"],
});
try {
  await mkdir("reports/lighthouse", { recursive: true });
  const records = [];
  for (const route of ["/", "/colecciones"]) {
    const result = await lighthouse(`http://localhost:3000${route}`, {
      port: 9224,
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    const name = route === "/" ? "home" : "catalog";
    await writeFile(`reports/lighthouse/${name}.html`, result.report[0]);
    await writeFile(`reports/lighthouse/${name}.json`, result.report[1]);
    records.push({
      route,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
    });
  }
  await writeFile(
    "reports/lighthouse/summary.json",
    JSON.stringify(records, null, 2),
  );
  console.log(JSON.stringify(records, null, 2));
} finally {
  await browser.close();
}
