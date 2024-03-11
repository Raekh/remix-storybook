import { Document } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import Button from "~/atoms/Button";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const affectation = await db.resourceAffectation.findUnique({
    where: { id },
    include: {
      organisation: true,
      resource: true,
      documents: true,
    },
  });

  const data = {
    affectation,
  };

  return data;
};

const AffectationView = () => {
  const { affectation } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1>Affectation {affectation.name}</h1>
        <Button className="btn btn-reverse" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="page-content">
        <div className="affectations-card">
          <div>{affectation.name}</div>
        </div>
        <div className="affectations__document-list">
          {affectation.documents.length === 0 ? (
            <>no documents</>
          ) : (
            affectation.documents.map((document: Document) => (
              <div key={document.id}>{document.type}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AffectationView;
