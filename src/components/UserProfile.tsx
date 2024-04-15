import { Prompts } from "@/utils/types";
import React from "react";
import PromptCard from "./PromptCard";

const UserProfile = ({
  name,
  desc,
  data,
  userProfileId,
  handleEdit,
  handleDelete,
}: {
  name: string;
  desc: string;
  userProfileId: string | null;
  data: Prompts[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => Promise<void>;
}) => {
  return (
    <section className="w-full">
      <h1 className="text-left head_text blue_gradient user_profile">
        {name} profile
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data?.map((prompt, idx) => (
          <PromptCard
            key={idx}
            post={prompt}
            {...{ handleDelete, handleEdit, userProfileId }}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
