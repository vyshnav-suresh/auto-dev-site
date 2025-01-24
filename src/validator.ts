// src/validator.ts
import { execSync } from "child_process";

export function validateTypeScript(code: string): boolean {
  try {
    execSync(`ts-node -e '${code}'`, { timeout: 5000 });
    return true;
  } catch (e) {
    return false;
  }
}
