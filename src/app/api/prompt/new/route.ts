import Prompt from "@/models/prompts";
import { connectToDB } from "@/utils/database";
import { Prompts } from "@/utils/types";

export async function POST(req: Request) {
  try {
    const { userId, prompt, tag } = await req.json();
    await connectToDB();
    //   create document in collection
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(new Error("Error creating prompt")), {
      status: 500,
    });
  }
}
