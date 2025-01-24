// src/index.ts
import { scrapeGitHubTrending } from "./scraper";
import { generateArticle } from "./generator";
import { writePost } from "../writer";
import { validateTypeScript } from "./validator";
import { extractCodeBlocks } from "./utils";

async function main() {
  const trends = await scrapeGitHubTrending();

  for (const topic of trends) {
    const content = await generateArticle(topic);
    const codeBlocks = extractCodeBlocks(content); // Implement regex-based extraction

    if (codeBlocks.every(validateTypeScript)) {
      await writePost(topic, content);
    } else {
      console.log(`Invalid code in ${topic}, skipping...`);
    }
  }
}

main();
