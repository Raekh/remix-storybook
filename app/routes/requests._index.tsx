import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    requests: await db.mergeRequest.findMany({
      take: 20,
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

const RequestItems = () => {
  const { requests } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Requests</h1>
        <Link to="/requests/new" className="btn">
          New Request
        </Link>
      </div>
      <ul className="requests-list">
        {requests.map((request) => {
          return <li key={request.id}>{request.title}</li>;
        })}
      </ul>
    </>
  );
};

export default RequestItems;
