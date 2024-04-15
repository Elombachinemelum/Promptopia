"use client";
import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [providers, setProviders] = useState<unknown | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const isLoggedin = true;
  useEffect(() => {
    async function fetchProviders() {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    }
    fetchProviders();
  }, []);

  console.log(session);
  return (
    <nav className="mb-16  flex fixed top-0 right-0 w-full bg-[#fff] z-[500]">
      <div className="pt-3 px-6 mx-auto flex justify-between w-full">
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
        <div className="sm:flex hidden relative">
          {session?.user ? (
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
                src={session?.user?.image || "/assets/images/logo.svg"}
                className="rounded-full cursor-pointer"
                onClick={() => setToggleMenu((prev) => !prev)}
              />

              {toggleMenu && (
                <div className="dropdown">
                  <Link
                    href={`/profile?id=${
                      session?.user["id" as keyof typeof session.user]
                    }`}
                    className="dropdown_link"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleMenu(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign out
                  </button>
                </div>
              )}
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
          {session?.user ? (
            <div className="flex">
              <Image
                alt="Profile"
                height={37}
                width={37}
                src={session?.user?.image || "/assets/images/logo.svg"}
                className="rounded-full"
                onClick={() => setToggleMenu((prev) => !prev)}
              />

              {toggleMenu && (
                <div className="dropdown">
                  <Link
                    href={`/profile?id=${
                      session?.user["id" as keyof typeof session.user]
                    }`}
                    className="dropdown_link"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleMenu(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign out
                  </button>
                </div>
              )}
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
      </div>
    </nav>
  );
};

export default Nav;
