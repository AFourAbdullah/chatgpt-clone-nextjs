"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-xl w-full">
        <div className="text-gray-800">Output</div>
      </div>
      <div className="flex w-full h-auto">
        <div className="relative w-full ">
          <textarea
            rows={query.length > 200 ? 30 : 2}
            className="m-0 w-full border border-black/10 focus:outline-none bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs p-3"
            placeholder="Search..."
            value={query}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
            // style={{ height: query.length > 300 ? "10rem" : "4rem" }} // Dynamically adjust the height based on content
          />
          {query && (
            <button className="absolute right-4 bottom-3 text-gray-500 rounded p-2">
              <BiSolidRightArrow />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
