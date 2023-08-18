import useSWR from "swr";
import { config } from "../config/config";
import Axios from "axios";
import Article from "./Article";
import { useState } from "react";

const Articles = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const fetcher = (url) => Axios.get(url).then((res) => res.data);
  const pageSize = 10;

  const { data, error, isLoading } = useSWR(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${pageSize}&page=${pageIndex}&apiKey=${config.apiKey}`,
    fetcher
  );

  const totalPages = Math.ceil(data?.totalResults / pageSize);
  if (isLoading)
    return (
      <div className=" flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className=" flex justify-center items-center h-screen">
        Request failed
      </div>
    );
  return (
    <div>
      <h1 className=" font-bold text-3xl mb-3 text-center">
        Data Fetching using SWR
      </h1>
      <div className=" flex flex-wrap px-2 gap-2 flex-1 justify-evenly">
        {data.articles?.map((article, index) => (
          <div className=" w-96" key={index}>
            <Article article={article} />
          </div>
        ))}
      </div>
      <div className="flex  mt6 justify-around">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 1}
          className={`px-4 py-2 text-sm font-semibold ${
            pageIndex === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-l`}
        >
          Previous
        </button>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === totalPages}
          className={`px-4 py-2 text-sm font-semibold ${
            pageIndex === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-r`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Articles;
