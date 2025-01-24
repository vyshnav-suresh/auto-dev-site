// src/utils.ts
export function extractCodeBlocks(content: string): string[] {
  const codeBlockRegex = /```[\s\S]*?\n([\s\S]*?)\n```/g;
  const matches: string[] = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Skip empty code blocks and language identifiers
    if (match[1]?.trim()) {
      matches.push(match[1].trim());
    }
  }

  return matches;
}

// Enhanced version with language detection
interface CodeBlock {
  language: string;
  code: string;
}

export function extractCodeBlocksWithMetadata(content: string): CodeBlock[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const blocks: CodeBlock[] = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [_, lang = "", code] = match;
    if (code?.trim()) {
      blocks.push({
        language: lang.trim() || "plaintext",
        code: code.trim(),
      });
    }
  }

  return blocks;
}
