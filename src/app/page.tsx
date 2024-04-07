import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full justify-center">
      <h1 className="head_text text-center ">
        Discover & Share
        <br className="max-mid:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center mx-auto">
        Propmtopia is an open source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      {/* feeds */}
      <Feed />
    </section>
  );
}
