"use client";
import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [providers, setProviders] = useState<unknown | null>(null);
  const isLoggedin = true;
  useEffect(() => {
    async function fetchProviders() {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    }
    fetchProviders();
  }, []);
  return (
    <nav className="mb-16 pt-3 flex justify-between w-full">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text sm:flex hidden">Promptopia</p>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {isLoggedin ? (
          <div className="flex gap-3 sm:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            <Image
              alt="Profile"
              height={37}
              width={37}
              src="/assets/images/logo.svg"
              className="rounded-full"
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((provider, indx) => (
                <button
                  key={indx}
                  type="button"
                  onClick={() => signIn(provider?.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {isLoggedin ? (
          <div className="flex">
            <Image
              alt="Profile"
              height={37}
              width={37}
              src="/assets/images/logo.svg"
              className="rounded-full"
              onClick={() => {}}
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers)?.map((provider, indx) => (
                <button
                  key={indx}
                  type="button"
                  onClick={() => signIn(provider?.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
