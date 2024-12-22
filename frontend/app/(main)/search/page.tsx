"use client";

import { getPosts, IPost, Post } from "@/entities/post";
import { IProfile, Profile } from "@/entities/profile";
import { categories } from "@/shared/constants/categories";
import { TCategory } from "@/shared/types/types";
import { ChevronLeft } from "@/shared/ui/icons/chevron-left";
import { ChevronRight } from "@/shared/ui/icons/chevron-right";
import { useEffect, useRef, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { getProfilesByFilters } from "@/entities/profile/api/get-profiles-by-filters";
import Pagination from "@/features/pagination/pagination";
import { useDebounce } from "@/shared/hooks/use-debounce";

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<IProfile[] | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "users">("posts");
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [sortOption, setSortOption] = useState<"date" | "popularity">("date");
  const [activeFilters, setActiveFilters] = useState<TCategory[]>(["all"]);

  // Параметри для пагінації
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 10;

  const filters: TCategory[] = ["all", ...categories];

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearchKeywords = useDebounce(searchKeywords, 300);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const fetchPosts = async () => {
    const selectedCategories =
      activeFilters.includes("all") || activeFilters.length === 0
        ? ""
        : activeFilters.join(",");
    const response = await getPosts({
      categories: selectedCategories,
      keywords: debouncedSearchKeywords,
      sortBy: sortOption,
      page: currentPage,
      pageSize,
    });
    setFilteredPosts(response.posts);
    setTotal(response.total);
    console.log("fetch posts request work");
  };

  const fetchUsers = async () => {
    const response = await getProfilesByFilters({
      keywords: searchKeywords,
      sortBy: sortOption,
      page: currentPage,
      pageSize,
    });
    setFilteredUsers(response.profiles);
    setTotal(response.total); // Загальна кількість користувачів
    // console.log("fetchUsers");
    // console.log(response);
  };

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPosts();
    } else {
      fetchUsers();
    }
  }, [
    activeTab,
    activeFilters,
    debouncedSearchKeywords,
    sortOption,
    currentPage,
  ]);

  const toggleFilter = (filter: TCategory) => {
    setActiveFilters((prev) => {
      if (filter === "all") {
        return ["all"];
      } else {
        const updatedFilters = prev.filter((f) => f !== "all");

        if (updatedFilters.includes(filter)) {
          return updatedFilters.filter((f) => f !== filter);
        } else {
          return [...updatedFilters, filter];
        }
      }
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex flex-col items-center transition duration-300 ease-in-out transform overflow-hidden z-10">
      {/* Search Input and Sort Select */}
      <div className="w-full max-w-md mb-3 mt-[2px] flex justify-center items-center gap-1">
        <input
          type="text"
          placeholder="search..."
          value={searchKeywords}
          onChange={(e) => setSearchKeywords(e.target.value)}
          className="w-3/5 md:w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-main-blue-light shadow-lg"
        />
        <div className="relative w-1/4">
          <Listbox value={sortOption} onChange={setSortOption}>
            <ListboxButton className="w-full px-3 py-2 text-sm md:text-base bg-white border border-stone-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-blue-light text-left">
              {sortOption}
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border border-stone-300 rounded-lg shadow-lg">
              {["date", "popularity"].map((item) => (
                <ListboxOption
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer select-none rounded-lg px-2 py-2 text-center ${
                      active ? "bg-main-blue-light text-white" : "text-gray-900"
                    }`
                  }
                >
                  {item}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>

      {activeTab === "posts" && (
        <div className="w-full max-w-3xl px-3 md:px-4 flex items-center mb-4">
          <button onClick={scrollLeft} className="text-gray-600 p-2">
            <ChevronLeft />
          </button>
          <div
            ref={sliderRef}
            className="flex space-x-2 md:space-x-3 overflow-x-auto scrollbar-hide"
          >
            {filters.map((filter: TCategory) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 md:px-4 py-1 text-sm md:text-base rounded-full whitespace-nowrap ${
                  activeFilters.includes(filter)
                    ? "bg-blue-100 text-main-blue"
                    : "bg-gray-100 text-gray-700"
                } transition-colors duration-200`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button onClick={scrollRight} className="text-gray-600 p-2">
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Tabs for Users and Posts */}
      <div className="w-full flex justify-center mb-5 transition duration-1000 ease-in-out transform">
        <div className="flex w-full bg-gray-200 overflow-hidden">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "posts"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            posts
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "users"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            users
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-5">
        {activeTab === "posts" &&
          filteredPosts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              text={post.text}
              date={post.date}
              likes={post.likes}
              categories={post.categories}
            />
          ))}
        {activeTab === "users" &&
          filteredUsers?.map((profile) => (
            <Profile key={profile.id} type="item" profile={profile} />
          ))}
      </div>

      {/* Пагінація */}
      {total > pageSize && (
        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
