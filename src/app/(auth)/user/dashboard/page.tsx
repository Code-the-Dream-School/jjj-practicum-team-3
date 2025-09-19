import React from "react"
import UserInfo from "@/components/functional/user-info"
import { getLoggedInUser } from "@/actions/users"

export default async function UserDashboardPage() {
  const response = await getLoggedInUser()

  if (!response.success) {
    return (
      <div className="p-5">
        <h1 className="text-red-500">Something went wrong: {response.message}</h1>
      </div>
    )
  }

  const user = response.data

  return (
    <div className="p-5">
      <h1>User Dashboard Page</h1>
      {user ? <UserInfo user={user} /> : <p>Loading...</p>}
    </div>
  )
}
