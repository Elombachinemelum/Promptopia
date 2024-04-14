import Prompt from "@/models/prompts";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

// GET
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
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt)
      return new Response(
        JSON.stringify({
          message: "Prompt not found",
        }),
        {
          status: 404,
        }
      );
    return new Response(JSON.stringify(prompt), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(new Error("Error fetching prompts")), {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id).populate("creator");
    if (!existingPrompt)
      return new Response(
        JSON.stringify({
          message: "Prompt not found",
        }),
        {
          status: 404,
        }
      );
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(new Error("Failed to update prompts")), {
      status: 500,
    });
  }
}

export async function DELETE(
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
    await Prompt.findByIdAndDelete(id);
    return new Response("Prompt deleted", {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(new Error("Error fetching prompts")), {
      status: 500,
    });
  }
}
