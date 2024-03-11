import { Organisation } from "@prisma/client";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Key } from "react";
import Button from "~/atoms/Button";
import OrganisationCard from "~/components/organisations/OrganisationCard";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { resourceId } = Object.fromEntries(form);
  if (!resourceId || resourceId === "") {
    return json(
      {
        message: "Bad request",
      },
      {
        status: 400,
      },
    );
  }

  await db.resource.delete({
    where: {
      id: resourceId.toString(),
    },
  });

  return redirect("/resources");
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  console.log({ id });

  const resource = await db.resource.findUnique({
    where: {
      id,
    },
    include: {
      affectations: true,
    },
  });

  if (!resource) {
    return redirect("/resources");
  }

  const affectations = await db.organisation.findMany({
    where: {
      affectations: {
        some: {
          resourceId: resource.id,
        },
      },
    },
  });

  const data = {
    resource,
    affectations,
  };

  return data;
};

const ResourceView = () => {
  const { resource, affectations } = useLoaderData<typeof loader>();
  return (
    <div>
      <Form method="DELETE">
        <input type="hidden" name="resourceId" value={resource.id} />
        <div className="page-header">
          <h1>Resource {resource.name}</h1>
          <Link to="/resources/" className="btn btn-reverse">
            Back
          </Link>
        </div>

        <div className="page-content">
          <div className="resources__card">
            <div>
              {resource.firstName} {resource.lastName}
            </div>
            <Button>Delete</Button>
          </div>
          <div className="resources__affectation-list">
            {affectations.length === 0 ? (
              <>no affectations</>
            ) : (
              affectations.map((organisation: Organisation, index: Key) => (
                <OrganisationCard
                  small
                  key={index}
                  organisation={organisation}
                />
              ))
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ResourceView;
