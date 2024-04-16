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
  const [searchedPrompts, setSearchedPrompts] = useState<Prompts[]>([]);
  const [prevTimeoutId, setPrevTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const filterPrompts = (search: string) => {
    const regEx = new RegExp(search, "gi");
    const filteredPrompts = prompts?.filter(
      (prompt) =>
        regEx.test(prompt.prompt) ||
        regEx.test(prompt.tag) ||
        regEx.test(prompt.creator?.username!)
    );
    return filteredPrompts;
  };

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(prevTimeoutId!);
    setSearchText(evt.target.value);

    setPrevTimeoutId(
      setTimeout(() => {
        const result = filterPrompts(evt.target.value);
        setSearchedPrompts(result);
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    const result = filterPrompts(tag);
    setSearchedPrompts(result);
  };

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
    <section className="feed mb-10">
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

      <PromptCardList
        data={searchedPrompts[0] ? searchedPrompts : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
