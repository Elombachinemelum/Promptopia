"use client";
import UserProfile from "@/components/UserProfile";
import { deletePrompt, fetchUserPrompts } from "@/utils/serverActions";
import { Prompts } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        const response = await deletePrompt(id);
        if (!response.error) {
          getUSerPosts();
        } else {
          console.error(response.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const [prompts, setPrompts] = useState<Prompts[]>([]);
  const { data: session } = useSession();

  async function getUSerPosts() {
    const response = await fetchUserPrompts(
      session?.user!["id" as keyof typeof session.user]!
    );

    if (!response.error) {
      setPrompts(response.data);
    } else console.error(response.error);
  }

  console.log(prompts);

  useEffect(() => {
    if (session?.user) {
      getUSerPosts();
    }
  }, [session]);

  return (
    <UserProfile
      name="My"
      desc="Welcome to your personalised profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
