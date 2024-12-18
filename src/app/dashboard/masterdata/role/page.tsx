"use client";
import useMenuStore from '@/hooks/useMenuStore';
import React, { useEffect } from 'react'

const RolePage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Role")
  }, [setMenu])

  return (
    <div>RolePage</div>
  )
}

export default RolePage;