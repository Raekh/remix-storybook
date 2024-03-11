import { db } from "./db.server";

// type ResourceProps = Record<keyof Resource, unknown>;

export const getResourceOrganisations = async (id: string) => {
  return db.organisation.findMany({
    where: {
      affectations: {
        some: {
          resourceId: id,
        },
      },
    },
    include: {
      affectations: true,
    },
  });
};
