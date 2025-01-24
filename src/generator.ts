// src/generator.ts
import OpenAI from "openai";
import { Config } from "./config";

const openai = new OpenAI({ apiKey: Config.OPENAI_KEY });

export async function generateArticle(topic: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Write a 500-word technical blog post about "${topic}" for developers. 
          Include code examples in JavaScript/TypeScript.`,
        },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message?.content || "";
    } else {
      console.error("No content returned from OpenAI response.");
      return "Error: No content generated.";
    }
  } catch (error) {
    console.error("Error generating article:", error);
    throw new Error(
      "Failed to generate article. Please check the OpenAI configuration or input."
    );
  }
}
