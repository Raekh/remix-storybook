import { Organisation } from "@prisma/client";
import OrganisationCard from "./OrganisationCard";

type OrganisationListProps = {
  organisations: Organisation[];
  small?: boolean;
};

const OrganisationList = ({
  organisations,
  small = false,
}: OrganisationListProps) => {
  return (
    <div className="organisations-container">
      {organisations.map((organisation) => {
        return (
          <OrganisationCard
            small={small}
            key={organisation.id}
            organisation={organisation}
          />
        );
      })}
    </div>
  );
};

export default OrganisationList;
