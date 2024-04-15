"use client";
import UserProfile from "@/components/UserProfile";
import {
  deletePrompt,
  fetchUserDetails,
  fetchUserPrompts,
} from "@/utils/serverActions";
import { Prompts } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string>("");
  const id = searchParams.get("id");

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
    const response = await fetchUserPrompts(id!);

    if (!response.error) {
      setPrompts(response.data);
    } else console.error(response.error);
  }

  async function getUserProfileDetails() {
    try {
      const userDetails = await fetchUserDetails(id as string);
      if (userDetails.data.username) {
        setUserEmail(userDetails.data.username);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (session?.user) {
      getUSerPosts();

      if (id && session?.user!["id" as keyof typeof session.user] !== id) {
        getUserProfileDetails();
      }
    }
  }, [session]);

  return (
    <UserProfile
      userProfileId={id}
      name={userEmail || "My"}
      desc="Welcome to your personalised profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
