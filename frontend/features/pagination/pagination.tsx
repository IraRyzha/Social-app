import { ChevronLeft } from "@/shared/ui/icons/chevron-left";
import { ChevronRight } from "@/shared/ui/icons/chevron-right";
import React from "react";

interface PaginationProps {
  total: number; // Загальна кількість елементів
  pageSize: number; // Кількість елементів на сторінку
  currentPage: number; // Базовий шлях для навігації
  onPageChange: (page: number) => void;
}

const Pagination = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-center mt-4">
      {/* Кнопка для попередньої сторінки */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-[0.5px] mx-1 text-sm rounded disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {/* Номери сторінок */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 text-sm rounded ${
            page === currentPage
              ? "bg-main-blue-light text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Кнопка для наступної сторінки */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-[0.5px] mx-1 text-sm rounded disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
