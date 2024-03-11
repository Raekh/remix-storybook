import { Organisation } from "@prisma/client";
import { Link } from "@remix-run/react";

type OrganisationProps = {
  organisation: Organisation;
  small?: boolean;
};

const OrganisationCard = ({
  organisation,
  small = false,
}: OrganisationProps) => {
  return (
    <div className={`organisations-card ${!!small && "card-small"}`}>
      <p>{organisation.name}</p>
      <Link to={`/organisations/${organisation.id}`}>
        <button className={`btn ${!!small && "btn-small"}`}>View</button>
      </Link>
    </div>
  );
};

export default OrganisationCard;
