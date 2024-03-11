import { ResourceAffectation } from "@prisma/client";
import AffectationCard from "./AffectationCard";

type AffectationListProps = {
  affectations: ResourceAffectation[];
};

const AffectationList = ({ affectations }: AffectationListProps) => {
  return (
    <div className="affectations-container">
      {affectations.map((affectation) => {
        return (
          <AffectationCard key={affectation.id} affectation={affectation} />
        );
      })}
    </div>
  );
};

export default AffectationList;
