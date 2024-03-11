import { User } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import Button from "~/atoms/Button";
import UserList from "~/components/users/UserList";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    users: await db.user.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

const UserItems = () => {
  const { users } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Users</h1>
        <Button>New User</Button>
      </div>
      <UserList users={users as unknown as User[]} />
    </>
  );
};

export default UserItems;
