import { LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Button from "~/atoms/Button";
import { db } from "~/utils/db.server";

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData();
//   const { scopeId } = Object.fromEntries(form);
//   if (!scopeId || scopeId === "") {
//     return json(
//       {
//         message: "Bad request",
//       },
//       {
//         status: 400,
//       },
//     );
//   }
//
//   await db.scope.delete({
//     where: {
//       id: scopeId.toString(),
//     },
//   });
//
//   return redirect("/scopes");
// };

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  console.log({ id });

  const request = await db.mergeRequest.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    return redirect("/requests");
  }

  const data = {
    request,
  };

  return data;
};

const RequestView = () => {
  const { request } = useLoaderData<typeof loader>();
  return (
    <div>
      <Form method="DELETE">
        <input type="hidden" name="requestId" value={request.id} />
        <div className="page-header">
          <h1>Request {request.name}</h1>
          <Link to="/requests/" className="btn btn-reverse">
            Back
          </Link>
        </div>

        <div className="page-content">
          <div className="requests__card">
            <div>
              {request.firstName} {request.lastName}
            </div>
            <Button>Delete</Button>
          </div>
          {/* <div className="requests__affectation-list"> */}
          {/*   {affectations.length === 0 ? ( */}
          {/*     <>no affectations</> */}
          {/*   ) : ( */}
          {/*     affectations.map((organisation: Organisation, index: Key) => ( */}
          {/*       <OrganisationCard */}
          {/*         small */}
          {/*         key={index} */}
          {/*         organisation={organisation} */}
          {/*       /> */}
          {/*     )) */}
          {/*   )} */}
          {/* </div> */}
        </div>
      </Form>
    </div>
  );
};

export default RequestView;
