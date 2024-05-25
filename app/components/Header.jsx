"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";

const Header = ({ username }) => {
  const { isSignedIn, userId } = useAuth();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Set language from localStorage on client side only
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    // Optionally, you can refresh the page or reload the content based on the selected language
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-5 bg-red-700">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg font-bold text-white uppercase">
            {language == "en" ? "News Articles" : "تازہ خبریں"}
          </div>
        </Link>
        <Link href="/social" className="text-white hover:text-black mx-4">
          {language == "en" ? "Social News" : "سماجی خبریں"}
        </Link>
        <Link href="/education" className="text-white hover:text-black mx-4">
          {language == "en" ? "Education News" : "تعلیمی خبریں"}
        </Link>
        <Link href="/relegion" className="text-white hover:text-black mx-4">
          {language == "en" ? "Religious News" : "مذہبی خبریں"}
        </Link>
        <Link href="/addnews" className="text-white hover:text-black mx-4">
          {language == "en" ? "Add News" : "خبریں شامل کریں"}
        </Link>
      </div>
      <div className="flex items-center text-white">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-red-700 text-white border-none outline-none mx-4"
        >
          <option value="en">English</option>
          <option value="ur">Urdu</option>
        </select>
        {!isSignedIn && (
          <>
            <Link href="/sign-in" className="text-white hover:text-black mr-4">
              Log in
            </Link>
            <Link href="/sign-up" className="text-white hover:text-black mr-4">
              Sign Up
            </Link>
          </>
        )}
        {isSignedIn && (
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
