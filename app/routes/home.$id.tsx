import { Home } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const data = {
    home: await db.home.findUnique({
      where: { id: params.id },
    }),
  };

  return data;
};

const HomeView = () => {
  const { home } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>{home.name}</h1>
        <Link to="/home" className="btn btn-reverse">
          Change home
        </Link>
      </div>
      <div>Home prout</div>
    </>
  );
};

export default HomeView;
