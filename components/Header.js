'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-black shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold hover:text-blue-400 transition-colors duration-200">
              ChasNews
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-6">
              <Link href="/" className=" hover:text-blue-400 px-3 py-2 rounded-md text-md font-semibold transition-colors duration-200">News</Link>
              <Link href="/sports" className="hover:text-blue-400 px-3 py-2 rounded-md text-md font-semibold transition-colors duration-200">Sports</Link>
              <Link href="/politics" className=" hover:text-blue-400 px-3 py-2 rounded-md text-md font-semibold transition-colors duration-200">Politics</Link>
              <Link href="/business" className=" hover:text-blue-400 px-3 py-2 rounded-md text-md font-semibold transition-colors duration-200">Business</Link>
              <Link href="/saved" className="hover:text-blue-400 px-3 py-2 rounded-md text-md font-semibold transition-colors duration-200">Bookmarks</Link>
            </nav>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">News</Link>
            <Link href="/sports" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Sports</Link>
            <Link href="/politics" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Politics</Link>
            <Link href="/business" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Business</Link>
            <Link href="/saved" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Bookmarks</Link>
          </div>
        </div>
      )}
    </header>
  );
}
