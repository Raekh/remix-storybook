import { Resource, ResourceAffectation } from "@prisma/client";
import { Link } from "@remix-run/react";

type AffectationProps = {
  affectation: ResourceAffectation & { resource: Resource };
};

const AffectationCard = ({ affectation }: AffectationProps) => {
  const resource = affectation.resource as Resource;
  return (
    <div className="affectation__card">
      <p>{resource.firstName}</p>
      <Link to={`/affectations/${affectation.id}`}>
        <button className="btn btn-small">View</button>
      </Link>
    </div>
  );
};

export default AffectationCard;
