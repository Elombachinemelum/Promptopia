"use client";
import Form from "@/components/Form";
import { fetchPrompt, updatePrompt } from "@/utils/serverActions";
import { Post } from "@/utils/types";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const UpdatePrompt = () => {
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status]);

  useEffect(() => {
    if (promptId) {
      const getPrompt = async () => {
        const res = await fetchPrompt(promptId);
        setPost(res.data);
        console.log(res);
      };
      getPrompt();
    }
  }, [promptId]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await updatePrompt(promptId!, post);
      if (!response.error) {
        router.push("/profile");
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  if (status === "unauthenticated" || status === "loading") return <></>;
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      setSubmitting={setSubmitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdatePrompt;
