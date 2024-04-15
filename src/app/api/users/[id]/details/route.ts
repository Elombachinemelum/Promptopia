import User from "@/models/user";
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
    const user = await User.findById(id);
    if (!user)
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 404,
        }
      );
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify(new Error("Error fetching user details")),
      {
        status: 500,
      }
    );
  }
}
