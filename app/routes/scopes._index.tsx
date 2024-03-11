import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    scopes: await db.scope.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

const ScopeItems = () => {
  const { scopes } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Scopes</h1>
        <Link to="/scopes/new" className="btn">
          New Scope
        </Link>
      </div>
      <ul className="scopes-list">
        {scopes.map((scope) => {
          return <li key={scope.id}>{scope.name}</li>;
        })}
      </ul>
    </>
  );
};

export default ScopeItems;
