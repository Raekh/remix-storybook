import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import ResourceList from "~/components/resources/ResourceList";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const data = {
    resources: await db.resource.findMany(),
  };

  return data;
};

const ResourcesList = () => {
  const { resources } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Resources</h1>
        <Link to="/resources/new" className="btn">
          Create new resource
        </Link>
      </div>
      <ul className="resources-list">
        {resources.length === 0 ? (
          <p>No resources</p>
        ) : (
          <>
            <ResourceList resources={resources} />
          </>
        )}
      </ul>
    </>
  );
};

export default ResourcesList;
