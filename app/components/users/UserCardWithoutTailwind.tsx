import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import Button from "~/atoms/Button";
import "./userCardWithoutTailwind.css";

type UserProps = {
  user: User;
};

const UserCardWithoutTailwind = ({ user }: UserProps) => {
  if (!user) {
    return <div>No user :{"<"}</div>;
  }
  return (
    <div className="notw-container">
      <p>{user.username}</p>
      <Link to={`/users/${user.id}`}>
        <Button className="notw-button">View</Button>
      </Link>
    </div>
  );
};

export default UserCardWithoutTailwind;
