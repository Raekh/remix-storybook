import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import Button from "~/atoms/Button";

type UserProps = {
  user: User;
};

const UserCard = ({ user }: UserProps) => {
  if (!user) {
    return <div>No user :{"<"}</div>;
  }
  return (
    <div className="flex flex-row justify-between items-center border border-black rounded-md py-2 px-3">
      <p>{user.username}</p>
      <Link to={`/users/${user.id}`}>
        <Button className="py-2 px-5 bg-red-500 rounded-md shadow-md">
          View
        </Button>
      </Link>
    </div>
  );
};

export default UserCard;
