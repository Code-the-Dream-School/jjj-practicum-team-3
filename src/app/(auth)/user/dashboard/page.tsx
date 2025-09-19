'use client'
import React, { useEffect, useState } from 'react'
import UserInfo from '@/components/functional/user-info'

function UserDashboardPage() {
  const [user, setUser] = useState<any>(null)

  const fetchData = async () => {
    try {
      const res = await fetch("/api/users/me", { credentials: "include" })
      const data = await res.json()
      console.log("API /me response:", data)
      if (data.success) {
        setUser(data.data)
      }
    } catch (error) {
      console.error("Something went wrong while fetching user", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-5">
      <h1>User Dashboard Page</h1>
      {user ? <UserInfo user={user} /> : <p>Loading...</p>}
    </div>
  )
}

export default UserDashboardPage
