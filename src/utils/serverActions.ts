"use server";

import axios from "axios";
import { Prompts } from "./types";
import { revalidatePath } from "next/cache";
type bodyType = ReadableStream<Uint8Array> & {
  json: () => Promise<unknown>;
};

export async function addPromptToDB(origin: string, data: Prompts) {
  // here we can hit up the API route we are going to create
  //   we can just interact with our db here in the server action but just to show how to goo about creating end points in nextjs
  //   fetch returns data as readable stream and this makes it hard to read so we swtich too axios
  try {
    const response = await axios.post(
      origin + "/api/prompt/new",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      error: false,
      data: response.data,
      message: "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      data: null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function fetchPrompts(origin: string) {
  try {
    const data = await axios.get(origin + "/api/prompt");
    return {
      error: false,
      data: data.data,
      message: "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}

export async function fetchUserPrompts(origin: string, userId: string) {
  try {
    const data = await axios.get(origin + `/api/users/${userId}/posts`);
    return {
      error: false,
      data: data.data,
      message: "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}

export async function fetchUserDetails(origin: string, userId: string) {
  try {
    const data = await axios.get(origin + `/api/users/${userId}/details`);
    return {
      error: false,
      data: data.status === 404 ? null : data.data,
      message: data.status === 404 ? data.data.message : "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}

export async function fetchPrompt(origin: string, userId: string) {
  try {
    const data = await axios.get(origin + `/api/prompt/${userId}`);
    return {
      error: false,
      data: data.status === 404 ? null : data.data,
      message: data.status === 404 ? data.data.message : "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}

export async function updatePrompt(
  origin: string,
  id: string,
  promptData: Partial<Prompts>
) {
  try {
    const data = await axios.patch(origin + `/api/prompt/${id}`, promptData);
    return {
      error: false,
      data: data.status === 404 ? null : data.data,
      message: data.status === 404 ? data.data.message : "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}

export async function deletePrompt(origin: string, userId: string) {
  try {
    const data = await axios.delete(origin + `/api/prompt/${userId}`);
    return {
      error: false,
      data: data.data,
      message: "Success",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
}
