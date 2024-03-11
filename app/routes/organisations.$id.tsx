import { Resource, ResourceAffectation } from "@prisma/client";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Key } from "react";
import Button from "~/atoms/Button";
import AffectationCard from "~/components/affectations/AffectationCard";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  console.log({ id });

  const organisation = await db.organisation.findUnique({
    where: {
      id,
    },
    include: {
      affectations: true,
    },
  });

  if (!organisation) {
    return redirect("/organisations");
  }

  const affectations = (await db.resourceAffectation.findMany({
    where: {
      organisationId: organisation.id,
    },
    include: {
      resource: true,
    },
  })) as unknown as ResourceAffectation & { resource: Resource };

  const data = {
    organisation,
    affectations,
  };

  return data;
};

const OrganisationView = () => {
  const { organisation, affectations } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="page-header">
        <h1>Organisation {organisation.name}</h1>
        <Link to="/organisations/" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <div className="organisations-card__header">
          <div className="organisations-card card-inverse">
            <div>{organisation.name}</div>
            <div>Affectations: {affectations.length}</div>
          </div>
          <div className="organisations-card__actions">
            <Button mode="inverse" fill={true}>
              Affecter
            </Button>
          </div>
        </div>
        <div className="organisations__resource-list">
          {affectations.length === 0 ? (
            <>no resources</>
          ) : (
            affectations.map(
              (
                affectation: ResourceAffectation & {
                  resource: Resource;
                },
                index: Key,
              ) => <AffectationCard key={index} affectation={affectation} />,
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganisationView;
