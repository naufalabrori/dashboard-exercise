"use client";
import useMenuStore from '@/hooks/useMenuStore';
import React, { useEffect } from 'react'

const UserPage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("User")
  }, [setMenu])

  return (
    <div>UserPage</div>
  )
}

export default UserPage