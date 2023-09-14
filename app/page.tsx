"use client";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [prevquery, setprevQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [visiblity, setvisiblity] = useState(false);
  const [output, setoutput] = useState(false);
  const onSubmit = async () => {
    setvisiblity(true);
    setQuery("");
    setprevQuery(query);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/getdata", { query });
      console.log("login response is", data);
      //  toast.success(JSON.stringify(data));
      //  router.push(`/profile/${data.user._id}`);
      setoutput(data.successData.choices[0].message.content);
    } catch (error: any) {
      //  toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  w-screen">
      <div className="bg-white rounded-lg p-4 h-screen shadow-lg w-full ">
        {visiblity && (
          <div className="text-gray-900 bg-gray-300 py-4 px-3 text-center">
            {prevquery}
          </div>
        )}

        <div className="text-gray-800 mx-auto w-[90%] mt-3 lg:w-[70%]">
          {output}
        </div>
        {loading && (
          <div className="animate-spin h-20 w-20 rounded-full mx-auto border-r-2 border-l-2 border-slate-900"></div>
        )}
      </div>
      <div className="flex w-[90%] sm:w-[80%] lg:w-[50%] h-auto absolute bottom-9 z-20 py-2  items-center">
        <div className="relative w-full  ">
          <textarea
            rows={query.length > 200 ? 9 : 1}
            className="m-0  h-full  w-full border-2 border-black/1- focus:outline-none bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-2xl dark:shadow-xs p-3"
            placeholder="Search..."
            value={query}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
            style={{ resize: "none" }}
            // style={{ height: query.length > 300 ? "10rem" : "4rem" }} // Dynamically adjust the height based on content
          />

          <button
            onClick={onSubmit}
            className="absolute bottom-4 flex items-center text-lg md:text-2xl right-4 md:bottom-3 text-gray-500 rounded p-2"
          >
            <BiSolidRightArrow />
          </button>
        </div>
      </div>
    </main>
  );
}
