"use client";
import { fetchPrompts } from "@/utils/serverActions";
import { Prompts } from "@/utils/types";
import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Prompts[];
  handleTagClick: (e: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((prompt, idx) => (
        <PromptCard key={idx} post={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [prompts, setPrompts] = useState<Prompts[]>([]);
  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  };

  const handleTagClick = (tag: string) => {};

  const getPrompts = async () => {
    const response = await fetchPrompts();
    if (!response.error) {
      setPrompts(response.data);
    } else console.error(response.error);
  };

  useEffect(() => {
    getPrompts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full justify-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for tag or a username"
          required
          value={searchText}
          onChange={handleSearch}
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
