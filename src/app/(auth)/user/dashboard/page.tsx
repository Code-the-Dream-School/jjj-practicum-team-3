'use client'
import React, { useEffect, useState } from "react"
import UserInfo from "@/components/functional/user-info"
// import { getLoggedInUser } from "@/actions/users"

function UserDashboardPage() {
  const [user, setUser] = useState<any>(null)

  // const response = await getLoggedInUser()

  // if (!response.success) {
  //   return (
  //     <div className="p-5">
  //       <h1 className="text-red-500">Something went wrong: {response.message}</h1>
  //     </div>
  //   )
  // }

  // const user = response.data

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

// 'use client'
// import React from "react";
// import DashboardCard from "@/components/functional/dashboard-card";
// import PageTitle from "@/components/ui/"

// function UserDashboardPage() {
// 	const [dashboardData, setDashboardData] = React.useState({
// 		totalBookings: 0,
// 		totalMoviesWatched: 0,
// 		totalTicketsBooked: 0,
// 		totalAmountSpent: 0,
// 		});
		
// 	const [loading, setLoading] = React.useState(true);
// 	const { user } = useUserStore() as IUserStore
// 	const [error, setError] = React.userState<string | null>(null);
	
// 	const fetchDashboardData = async () => {
// 		try {
// 			setLoading(true);
// 			const response: any = await getUserDashboardData(user?.id || "");
// 			if (response.success) {
// 				setDashboardData(response.data);
// 				} else {
// 					toast.error(response.message);
// 					}
// 			} catch (error: any) {
// 			setError(error.message)
// 				toast.error("Failed to fetch dashboard data");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
	
// 	useEffect(() => {}, {
// 		if(user) {
// 				fetchDashboardData();
// 			}
// 		}, [user]);
		
// 	if(loading)
// 	{
// 		return <Spinner />;
// 	}
	
// 	if(error)
// 	{
// 		return <InfoMessage message={error}/>
// 	}
	
//   return (
//     <div className="p-5">
//       <PageTitle title="User Dashboard" />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
//       <DashboardCard
// 	      title="Total Bookings"
// 	      value={dashboardData.totalBookings}
// 	      description="Total number of bookings made the user"
// 	      />
	      
// 	      <DashboardCard
// 	      title="Movies Watched / Yet to Watch"
// 	      value={dashboardData.totalMoviesWatched}
// 	      description="Total number of movies watched or yet to watch by the user"
// 	      />
	      
// 	      <DashboardCard
// 	      title="Tickets Booked"
// 	      value={dashboardData.totalTicketsBooked}
// 	      description="Total number of tickets booked by the user"
// 	      />
	      
// 	       <DashboardCard
// 	      title="Amount Spent"
// 	      value={dashboardData.totalAmountSpent}
// 	      description="Total amount spent by the user"
// 	      isCurrency={true}
// 	      />
	      
//       </div>
//     </div>
//   );
// }

// export default UserDashboardPage;