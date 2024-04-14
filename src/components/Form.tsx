"use client";
import { Post } from "@/utils/types";
import Link from "next/link";
import { ChangeEvent } from "react";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: "Create" | "Edit";
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  setSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <section className="w-full max-w-full flex flex-col justify-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label
          htmlFor="prompt"
          className="font-satoshi font-semibold text-base text-gray-700"
        >
          Your AI prompt
          <textarea
            name="prompt"
            id="prompt"
            cols={30}
            rows={10}
            className="form_textarea"
            required
            value={post.prompt}
            placeholder="Write prompt here..."
            onChange={(e) =>
              setPost({
                ...post,
                prompt: e.target.value,
              })
            }
          />
        </label>

        <label
          htmlFor="tag"
          className="font-satoshi font-semibold text-base text-gray-700"
        >
          <span>
            Tag{" "}
            <span className="font-normal">#product #webdevelopment #idea</span>
          </span>
          <input
            name="tag"
            id="tag"
            className="form_input"
            value={post.tag}
            placeholder="#tag"
            required
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
          />
        </label>

        <div className="flex justify-end mx-3 mb-5 gap-4 items-center">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
            type="submit"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
