'use client'
import { getLoggedInUser } from '@/actions/users'
import UserInfo from '@/components/functional/user-info'
import React from 'react'

function AdminDashboardPage() {
  const [user, setUser] = React.useState<any>(null)
  // const [message, setMessage] = React.useState<{ text: string; type: 'error' | 'success' } | null>(null)

  const fetchData = async () => {
    try {
      const response = await getLoggedInUser()
    //   if (!response.success) {
    //     setMessage({ text: response.message || "Something went wrong", type: "error" })
    //     return;
    //   } 
    //     setUser(response?.data)
    console.log("getLoggedInUser response:", response) 
    setUser(response?.data) // ✅ only store the actual user

    } catch (error) {
      console.error("Something went wrong while fetching data", error)
      // setMessage({ text: "Unexpected error while fetching user data", type: "error" })
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-5">
      <h1>Admin Dashboard Page</h1>
      
      {user ? <UserInfo user={user} /> : <p>Loading...</p>}

      {/* {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-white font-medium text-center ${
            message.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {user && <UserInfo user={user!} /> } */}
    </div>
  )
}

export default AdminDashboardPage