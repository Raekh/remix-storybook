import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import Button from "~/atoms/Button";

type UserProps = {
  user: User;
  noLink?: boolean;
};

const UserCard = ({ user, noLink = false }: UserProps) => {
  if (!user) {
    return <div>No user :{"<"}</div>;
  }
  return (
    <div className="users-card">
      <p>{user.username}</p>
      {/*  this is just to make sure that Link is indeed the
       thing throwing the `useHref()` error */}
      {noLink ? (
        <Button>View</Button>
      ) : (
        <Link to={`/users/${user.id}`}>
          <Button>View</Button>
        </Link>
      )}
    </div>
  );
};

export default UserCard;
