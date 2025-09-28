import { IUsersStore, useUsersStore } from "@/lib/store/usersStore";
import InfoMessage from "@/components/functional/info-message";
import PageTitle from "@/components/ui/page-title";
import { formatDate } from "@/lib/utils";

const UserProfilePage = () => {
  const { user } = useUsersStore();

  if (!user) {
    return <InfoMessage message="User not found" />;
  }

  const renderUserProperty = (label: string, value: string | number) => (
    <div>
      <h2 className="text-sm text-gray-500">{label}</h2>
      <p className="font-bold text-sm">{value}</p>
    </div>
  );

  return (
    <div>
      <PageTitle title="User Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-7 border border-gray-300 p-5 rounded shadow-sm">
        {renderUserProperty("User ID", user.id)}
        {renderUserProperty("Username", user.username)}
        {renderUserProperty("Email", user.email)}
        {renderUserProperty("Role", user.role)}
        {renderUserProperty("Joined At", formatDate(user.created_at))}
      </div>
    </div>
  );
};

export default UserProfilePage;