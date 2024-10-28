"use client";
import React from "react";
import ReactPaginate from "react-paginate";
import { PaginationData } from "@/misc/interfaces";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Prop {
  pagination: PaginationData | {};
}

function Pagination({ pagination }: Prop) {
  const router = useRouter();
  if (!(pagination as PaginationData)?.totalDocs) return null;
  const data = pagination as PaginationData;
  if (data.totalPages === 1) return null;
  const handlePageClick = ({ selected }: { selected: number }) => {
    console.log("selected Page", selected);
    router.push(`?page=${selected + 1}`);
  };
  console.log(pagination);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={data.hasNextPage ? <BsArrowRight /> : null}
      onPageChange={handlePageClick}
      // pageRangeDisplayed={data.limit}
      pageCount={data.totalPages}
      initialPage={data.page - 1}
      previousLabel={data.hasPrevPage ? <BsArrowLeft /> : null}
      renderOnZeroPageCount={null}
      className="flex items-center gap-3 float-right mt-5"
    />
  );
}

export default Pagination;
