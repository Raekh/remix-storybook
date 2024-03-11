import { Resource } from "@prisma/client";
import ResourceCard from "./ResourceCard";

type ResourceListProps = {
  resources: Resource[];
};

const ResourceList = ({ resources }: ResourceListProps) => {
  return (
    <div className="resources-container">
      {resources.map((resource) => {
        return <ResourceCard key={resource.id} resource={resource} />;
      })}
    </div>
  );
};

export default ResourceList;
