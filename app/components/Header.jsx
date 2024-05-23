import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";

const Header = async ({ username }) => {
  const { userId } = auth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-5  bg-red-700">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg font-bold text-white uppercase">
            Articles Website
          </div>
        </Link>
        <Link href="/social" className="text-white hover:text-black mx-4">
          Social News
        </Link>
        
        <Link href="/education" className="text-white hover:text-black mx-4">
          Education News
        </Link>
        <Link href="/relegion" className="text-white hover:text-black mx-4">
          Relegion News
        </Link>
        <Link href="/addnews" className="text-white hover:text-black mx-4">
          Add News
        </Link>
      </div>
      <div className="flex items-center text-white">
        {!userId && (
          <>
            <Link href="/sign-in" className="text-white hover:text-black mr-4">
              Log in
            </Link>
            <Link href="/sign-up" className="text-white hover:text-black mr-4">
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <Link href="/profile" className="text-gray-300 hover:text-white mr-4">
            Profile
          </Link>
        )}
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
