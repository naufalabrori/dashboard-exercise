import { Button } from "@/components/ui/button"
import { PaginationProps } from "./types"

export function DataTablePagination({
  currentPage,
  totalPages,
  total,
  offset,
  limit,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="text-sm text-muted-foreground">
        Showing {offset + 1} to{" "}
        {Math.min(offset + limit, total)} of{" "}
        {total} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange('next')}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}