"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import UserMenu from "./UserMenu";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function Navbar({ myUser = null, basketItems = {} }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: session } = useSession();

  const router = useRouter();

  const params = useSearchParams();

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <div className="shadow-xl bg-white z-[99999] sticky">
      <div className="p-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex items-center flex-1 gap-6">
            <Link href="/">
              <img
                src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/logo.svg"
                alt="logo"
                width={91}
                height={34}
              ></img>
            </Link>

            <div className="text-sm text-gray-600">Categorias</div>

            <form
              className="hidden lg:flex-1 lg:flex"
              onSubmit={() => console.log("submit")}
            >
              <input
                type="text"
                placeholder="Busca cualquier cosa ..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                        w-full p-3 font-light bg-white rounded-full border-black border-[1px] outline-none
                        "
              />
            </form>
          </div>

          <div className="items-center gap-4 text-[.8rem] px-2 hidden lg:flex">
            <div className="text-black">
              <Link href="#">Udemy Business</Link>
            </div>

            <div className="text-black">
              <div onClick={myUser ? signIn() : null}>Enseña en Udemy</div>
            </div>

            {/* <div className="relative">
              <Link href="/basket">
                <MdOutlineShoppingCart className="w-10 text-black h-9" />
              </Link>
              <div className="absolute flex items-center justify-center w-5 h-5 text-white bg-blue-500 rounded-full -right-1 -bottom-2">
                {basketItems.length}1
              </div>
            </div> */}
          </div>

          <div className="flex items-center gap-3">
            {!session && (
              <>
                <div>
                  <button
                    onClick={() => signIn()}
                    className="py-2 px-6 border-black border-[1px] text-black font-bold"
                  >
                    Iniciar sesión
                  </button>
                </div>

                <div>
                  <button
                    className="py-2 px-6 bg-black text-white border-[1px] border-black font-semibold"
                    onClick={() => signIn()}
                  >
                    Regístrate
                  </button>
                </div>
              </>
            )}

            {session && (
              <div
                className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <span>{session.user?.name.at(0)?.toUpperCase()}</span>
                <span>{session.user?.name.at(1)?.toUpperCase()}</span>
              </div>
            )}

            {userMenuOpen && (
              <div className="absolute bottom-0 top-20 right-20">
                <UserMenu
                  currentUser={session.user}
                  closeUserMenu={closeUserMenu}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
