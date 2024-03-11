import { MergeRequest } from "@prisma/client";
import RequestCard from "./RequestCard";

type RequestListProps = {
  requests: MergeRequest[];
  small?: boolean;
};

const RequestList = ({ requests, small = false }: RequestListProps) => {
  return (
    <div className="requests-container">
      {requests.map((request) => {
        return <RequestCard small={small} key={request.id} request={request} />;
      })}
    </div>
  );
};

export default RequestList;
