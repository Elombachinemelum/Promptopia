import Prompt from "@/models/prompts";
import { connectToDB } from "@/utils/database";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify(new Error("Error fetching user prompts")),
      {
        status: 500,
      }
    );
  }
}
