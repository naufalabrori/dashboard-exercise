"use client";
import useMenuStore from '@/hooks/useMenuStore';
import React, { useEffect } from 'react'

const InboundPage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Inbound")
  }, [setMenu])

  return (
    <div>Inbound Page</div>
  )
}

export default InboundPage

