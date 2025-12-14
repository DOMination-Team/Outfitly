"use client";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { ChevronLeft } from "lucide-react";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";

const WardrobePagination = ({
  paginationDetails: { hasMore },
}: {
  paginationDetails: Omit<GetUserWardrobeItemResponse, "items">;
}) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            {/* <PaginationItem>
              <Button variant="outline" onClick={() => handlePageChange(page - 1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </PaginationItem> */}
            <PaginationItem>
              <Button variant="outline" onClick={() => handlePageChange(page - 1)}>
                {page - 1}
              </Button>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <Button variant="outline" disabled>
            {page}
          </Button>
        </PaginationItem>
        {hasMore && (
          <PaginationItem>
            <Button variant="outline" onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default WardrobePagination;
