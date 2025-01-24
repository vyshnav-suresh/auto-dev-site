// src/writer.ts
import fs from "fs/promises";
import path from "path";

export async function writePost(topic: string, content: string): Promise<void> {
  const date = new Date().toISOString().split("T")[0];
  const filename = `${date}-${topic.toLowerCase()}.md`;
  const header = `---
title: "${topic}"
date: "${date}"
---

`;

  await fs.mkdir("content/posts", { recursive: true });
  await fs.writeFile(path.join("content/posts", filename), header + content);
}
