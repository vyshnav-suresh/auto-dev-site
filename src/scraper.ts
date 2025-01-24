// src/scraper.ts
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeGitHubTrending(): Promise<string[]> {
  const { data } = await axios.get("https://github.com/trending");
  const $ = cheerio.load(data);

  return $("article h2")
    .map((i, el) => $(el).text().trim().replace(/\s+/g, "-"))
    .get()
    .slice(0, 5);
}
