import Prompt from "@/models/prompts";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
  try {
    // connect to db and find all prompts
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(new Error("Error fetching prompts")), {
      status: 500,
    });
  }
}
