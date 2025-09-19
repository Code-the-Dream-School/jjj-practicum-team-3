'use client'
import { getLoggedInUser } from '@/actions/users'
import UserInfo from '@/components/functional/user-info'
import React from 'react'

function AdminDashboardPage() {
  const [user, setUser] = React.useState<any>(null)

  const fetchData = async () => {
    try {
      const response = await getLoggedInUser()
      console.log("getLoggedInUser response:", response) 
      setUser(response?.data) // ✅ only store the actual user
    } catch (error) {
      console.error("Something went wrong while fetching data", error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-5">
      <h1>Admin Dashboard Page</h1>
      {user ? <UserInfo user={user} /> : <p>Loading...</p>}
    </div>
  )
}

export default AdminDashboardPage