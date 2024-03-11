import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getLoggedInUser } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const Organisations = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Organisations;
