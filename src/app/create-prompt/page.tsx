"use client";
import Form from "@/components/Form";
import { addPromptToDB } from "@/utils/serverActions";
import { Post } from "@/utils/types";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";

const CreatePrompt = () => {
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const data = useSession();

  const handleSubmit = async () => {
    const data2 = await getSession();
    console.log("called", { data, data2 });
    setSubmitting(true);
    // here we can call some server action and interact with DB directly from there or we can create an api route..
    // Since we are using the app router, we must not use the api route instead just "Server component" but ofcurse we are in a client
    // component here sp that's not possible.
    // await addPromptToDB(
    //   {
    //     prompt: post.prompt,
    //     tag: post.tag,
    //     userId: "",
    //   },
    //   () => {}
    // );
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;
