"use client";

import { IPost, Post } from "@/entities/post";
import { getPostsByFilters } from "@/entities/post/api/get-posts-by-filters";
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

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<IProfile[] | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "users">("posts");
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [sortOption, setSortOption] = useState<"date" | "popularity">("date");
  const [activeFilters, setActiveFilters] = useState<TCategory[]>(["all"]);

  const filters: TCategory[] = ["all", ...categories];

  const sliderRef = useRef<HTMLDivElement | null>(null);

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
    const response = await getPostsByFilters(
      activeFilters,
      searchKeywords,
      sortOption
    );
    setFilteredPosts(response);
  };

  const fetchUsers = async () => {
    const response = await getProfilesByFilters(searchKeywords, sortOption);
    setFilteredUsers(response);
  };

  useEffect(() => {
    if (activeTab == "posts") {
      fetchPosts();
    } else {
      fetchUsers();
    }
  }, [activeTab, activeFilters, searchKeywords, sortOption]);

  const toggleFilter = (filter: TCategory) => {
    setActiveFilters(
      (prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter) // Видаляє, якщо фільтр вже активний
          : [...prev, filter] // Додає новий фільтр
    );
  };

  return (
    <div className="w-full h-auto flex flex-col items-center transition duration-300 ease-in-out transform">
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
            {/* Кнопка для відкриття списку */}
            <ListboxButton className="w-full px-3 py-2 text-sm md:text-base bg-white border border-stone-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-blue-light text-left">
              {sortOption}
            </ListboxButton>

            {/* Список опцій */}
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

      {activeTab == "posts" && (
        <div className="w-full max-w-3xl px-3 md:px-4 flex items-center mb-4">
          {/* Left Arrow */}
          <button onClick={scrollLeft} className="text-gray-600 p-2">
            <ChevronLeft />
          </button>

          {/* Slider */}
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

          {/* Right Arrow */}
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
        {activeTab == "posts" &&
          filteredPosts?.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                user={post.user}
                text={post.text}
                date={post.date}
                likes={post.likes}
                categories={post.categories}
              />
            );
          })}
        {activeTab == "users" &&
          filteredUsers?.map((profile) => {
            return <Profile key={profile.id} type="item" profile={profile} />;
          })}
      </div>
    </div>
  );
}
