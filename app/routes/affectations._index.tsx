import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import AffectationList from "~/components/affectations/AffectationList";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const data = {
    affectations: await db.resourceAffectation.findMany(),
  };

  return data;
};

const AffectationsList = () => {
  const { affectations } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Affectations</h1>
        <Link to="/affectations/new" className="btn">
          Create new affectation
        </Link>
      </div>
      <ul className="affectations-list">
        {affectations.length === 0 ? (
          <p>No affectations</p>
        ) : (
          <>
            <AffectationList affectations={affectations} />
          </>
        )}
      </ul>
    </>
  );
};

export default AffectationsList;
