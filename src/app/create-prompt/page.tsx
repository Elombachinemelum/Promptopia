"use client";
import Form from "@/components/Form";
import { addPromptToDB } from "@/utils/serverActions";
import { Post } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const CreatePrompt = () => {
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // here we can call some server action and interact with DB directly from there or we can create an api route..
    // Since we are using the app router, we must not use the api route instead just "Server component" but ofcourse we are in a client
    // component here so that's not possible.
    try {
      const response = await addPromptToDB({
        prompt: post.prompt,
        tag: post.tag,
        userId: session?.user?.["id" as keyof typeof session.user]!,
      });

      if (!response.error) {
        router.push("/");
      } else console.error(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  if (status === "unauthenticated" || status === "loading") return <></>;
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
