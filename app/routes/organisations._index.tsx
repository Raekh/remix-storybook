import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import OrganisationList from "~/components/organisations/OrganisationList";
import { db } from "~/utils/db.server";
import { getLoggedInUser } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // const data = {
  //   organisations: await db.organisation.findMany({
  //     take: 20,
  //     select: { id: true, name: true },
  //     orderBy: { createdAt: "desc" },
  //   }),
  // };
  const user = await getLoggedInUser(request);
  if (!user) {
    return redirect("/login");
  }

  const data = {
    organisations: await db.organisation.findMany(),
  };

  console.log({ data });

  return data;
};

const OrganisationsList = () => {
  const { organisations } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Organisations</h1>
        <Link to="/organisations/new" className="btn">
          Create new organisation
        </Link>
      </div>
      <ul className="organisations-list">
        {organisations.length === 0 ? (
          <p>No organisations</p>
        ) : (
          <>
            <OrganisationList organisations={organisations} />
          </>
        )}
      </ul>
    </>
  );
};

export default OrganisationsList;
