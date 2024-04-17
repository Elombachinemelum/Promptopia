"use client";
import Form from "@/components/Form";
import { fetchPrompt, updatePrompt } from "@/utils/serverActions";
import { Post } from "@/utils/types";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";

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
        const res = await fetchPrompt(window.location.origin, promptId);
        setPost(res.data);
      };
      getPrompt();
    }
  }, [promptId]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await updatePrompt(
        window.location.origin,
        promptId!,
        post
      );
      if (!response.error) {
        router.push(
          `/profile?id=${session?.user!["id" as keyof typeof session.user]}`
        );
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense
      fallback={
        <p className="desc text-center !mt-7">Loading Promp Details...</p>
      }
    >
      {status === "unauthenticated" || status === "loading" ? (
        <></>
      ) : (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          setSubmitting={setSubmitting}
          handleSubmit={handleSubmit}
        />
      )}
    </Suspense>
  );
};

export default UpdatePrompt;
