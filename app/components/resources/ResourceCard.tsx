import { Resource } from "@prisma/client";
import { Link } from "@remix-run/react";

type ResourceProps = {
  resource: Resource;
};

const ResourceCard = ({ resource }: ResourceProps) => {
  return (
    <div className="resource__card">
      <p>
        {resource.firstName} {resource.lastName}
      </p>
      <Link to={`/resources/${resource.id}`}>
        <button className="btn btn-small">View</button>
      </Link>
    </div>
  );
};

export default ResourceCard;
