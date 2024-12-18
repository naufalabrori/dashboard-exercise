import { useState } from 'react'

interface PaginationParams {
    orderBy?: string;
    isDesc?: boolean;
    limit: number;
    offset: number;
  }

interface UsePaginationReturn {
  pagination: PaginationParams
  totalPages: number
  currentPage: number
  handlePageChange: (direction: 'prev' | 'next') => void
}

export function useTablePagination(
  total: number,
  initialLimit: number = 10
): UsePaginationReturn {
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: initialLimit,
    offset: 0,
  })

  const totalPages = Math.ceil(total / pagination.limit)
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1

  const handlePageChange = (direction: 'prev' | 'next') => {
    setPagination(prev => ({
      ...prev,
      offset: direction === 'prev'
        ? Math.max(0, prev.offset - prev.limit)
        : prev.offset + prev.limit
    }))
  }

  return {
    pagination,
    totalPages,
    currentPage,
    handlePageChange,
  }
}