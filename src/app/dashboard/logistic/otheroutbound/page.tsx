"use client";
import useMenuStore from '@/hooks/useMenuStore';
import React, { useEffect } from 'react'

const OtherOutboundPage = () => {
  const { setMenu } = useMenuStore();
  useEffect(() => {
    setMenu("Other Outbound")
  }, [setMenu])

  return (
    <div>OtherOutbound Page</div>
  )
}

export default OtherOutboundPage;