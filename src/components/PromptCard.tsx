import { Prompts } from "@/utils/types";
import Image from "next/image";
import { useState } from "react";
import copy from "../../public/assets/icons/copy.svg";
import tick from "../../public/assets/icons/tick.svg";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: Prompts;
  handleTagClick?: (e: string) => void;
  handleEdit?: (e: string) => void;
  handleDelete?: (e: string) => void;
}) => {
  const [copied, setCopied] = useState<string>("");
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image ?? ""}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={async () => {
            await window.navigator.clipboard.writeText(post.prompt);
            setCopied(post.prompt);
            setTimeout(() => setCopied(""), 3000);
          }}
        >
          <Image
            src={post.prompt === copied ? tick : copy}
            alt="copy_prompt"
            width={12}
            height={12}
            className=""
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick?.(post.tag)}
      >
        {post.tag?.slice(0, 1) === "#" ? `${post.tag}` : `#${post.tag}`}
      </p>

      {session?.user && pathname === "/profile" && (
        <div className="flex justify-end gap-2 mt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit?.(post._id!)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete?.(post._id!)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
