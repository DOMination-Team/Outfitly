"use client";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { useTranslations } from "next-intl";

const WardrobePagination = ({
  paginationDetails: { totalPages },
}: {
  paginationDetails: Omit<GetUserWardrobeItemResponse, "items">;
}) => {
  const t = useTranslations("Wardrobe.pagination");
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
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 rtl-flip" />
            {t("previous")}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" disabled>
            {page} / {totalPages}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            {t("next")}
            <ChevronRight className="h-4 w-4 rtl-flip" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default WardrobePagination;
