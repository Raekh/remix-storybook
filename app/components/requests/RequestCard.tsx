import { MergeRequest } from "@prisma/client";
import { Link } from "@remix-run/react";
import Button from "~/atoms/Button";

type RequestProps = {
  request: MergeRequest;
  noLink?: boolean;
};

const RequestCard = ({ request, noLink = false }: RequestProps) => {
  if (!request) {
    return <div>No request :{"<"}</div>;
  }
  return (
    <div className="requests-card">
      <p>{request.title}</p>
      {noLink ? (
        <Button>View</Button>
      ) : (
        <Link to={`/requests/${request.id}`}>
          <Button>View</Button>
        </Link>
      )}
    </div>
  );
};

export default RequestCard;
