import { User } from "@prisma/client";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return redirect("/users");
  }

  const data = {
    user,
  };

  return data;
};

const UserView = () => {
  const { user }: { user: User } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="page-header">
        <h1>User {user.username}</h1>
        <Link to="/users/" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <div className="users__card">
          <div>
            {user.username} was created:{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
