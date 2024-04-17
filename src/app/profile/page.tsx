"use client";
import UserProfile from "@/components/UserProfile";
import {
  deletePrompt,
  fetchUserDetails,
  fetchUserPrompts,
} from "@/utils/serverActions";
import { Prompts } from "@/utils/types";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Profile",
//   description: "View user's personal posts",
// };

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string>("");
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const id = searchParams.get("id");
  const { status } = useSession();

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
    setLoadingProfile(true);
    try {
      const userDetails = await fetchUserDetails(id as string);
      if (userDetails.data.username) {
        setUserEmail(userDetails.data.username);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    if (session?.user) {
      getUSerPosts();

      if (id && session?.user!["id" as keyof typeof session.user] !== id) {
        getUserProfileDetails();
      }
    }
  }, [session, id]);

  if (status === "unauthenticated" || status === "loading") return <></>;

  return (
    <UserProfile
      userProfileId={id}
      name={
        userEmail && !loadingProfile
          ? userEmail
          : !userEmail && loadingProfile
          ? ""
          : "My"
      }
      desc={
        userEmail && !loadingProfile
          ? `Prompts from ${userEmail}`
          : !userEmail && loadingProfile
          ? ""
          : "Welcome to your personalised profile page"
      }
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
