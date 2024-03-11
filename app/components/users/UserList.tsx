import { User } from "@prisma/client";
import UserCard from "./UserCard";

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="user-container">
      {users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      })}
    </div>
  );
};

export default UserList;
