/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from 'react'
import { SortingState } from '@tanstack/react-table'
import { PaginationParams } from '@/lib/types'
import { useListOtherInboundHeader } from '@/services/OtherInbound/getListOtherInboundHeader'

interface UseTableDataReturn<TData> {
  data: TData[]
  total: number
  loading: boolean
  error: Error | null
}

export function useTableData<TData>(
  sorting: SortingState,
  pagination: PaginationParams,
  filter: any
): UseTableDataReturn<TData> {
  const [data, setData] = useState<TData[]>([])
  const [total, setTotal] = useState(0)

  const sortField = sorting[0]
  const params = {
    ...pagination,
    orderBy: sortField?.id,
    isDesc: sortField?.desc,
    [filter.key]: filter.value
  }

  const { data: queryData, error, isLoading } = useListOtherInboundHeader(params)

  useEffect(() => {
    if (queryData) {
      setData(queryData.data as TData[])
      setTotal(queryData.totalData)
    }
  }, [queryData])

  return { data, total, loading: isLoading, error }
}
