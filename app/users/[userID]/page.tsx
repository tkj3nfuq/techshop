"use client"

import React from 'react'
import UserEditTable from '@/ui/user/userEditTable/page'

export default function UserID({ params }: { params: { userID: string } }) {
  return (
    <UserEditTable userID={params.userID} />
  )
}
