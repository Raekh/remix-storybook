import { Organisation } from "@prisma/client";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import Button from "~/atoms/Button";
import { db } from "~/utils/db.server";
import { getLoggedInUser } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const organisations = await db.organisation.findMany();
  return { organisations };
};

const validateFirstName = (firstName: string) => {
  if (firstName.length < 3) {
    return "First name must be at least 3 characters long";
  }
};

const validateLastName = (lastName: string) => {
  if (lastName.length < 3) {
    return "Last name must be at least 3 characters long";
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { firstName, lastName, organisation } = Object.fromEntries(
    form.entries(),
  );

  console.log({ firstName, lastName, organisation });
  const fieldErrors = {
    firstName: validateFirstName(firstName.toString()),
    lastName: validateLastName(lastName.toString()),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json(
      {
        fieldErrors,
        fields: { firstName, lastName },
      },
      { status: 400 },
    );
  }

  const newResource = await db.resource.create({
    data: {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
    },
  });

  if (!!newResource && organisation !== "none") {
    console.log(organisation);
    await db.resourceAffectation.create({
      data: {
        resourceId: newResource.id,
        organisationId: organisation.toString(),
      },
    });
  }
  return redirect(`/resources/${newResource.id}`);
};

const ResourcesNew = () => {
  const { organisations } = useLoaderData<typeof loader>();
  console.log({ organisations });
  const data = useActionData<typeof action>();
  const [affectSelect, setAffectSelect] = useState(false);

  return (
    <>
      <div className="page-header">
        <h1>New Resource</h1>
        <Link to="/resources" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" id="firstName" />
            <div className="error">
              <p>
                {data?.fieldErrors?.firstName ? data.fieldErrors.firstName : ""}
              </p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" id="lastName" />
            <div className="error">
              <p>
                {data?.fieldErrors?.lastName ? data.fieldErrors.lastName : ""}
              </p>
            </div>
          </div>
          <div className="form-control">
            <Button
              id="affect"
              type="button"
              onClick={() => setAffectSelect((prev) => !prev)}
              mode="inverse"
            >
              Affect to organisation
            </Button>
            <select
              style={{ display: affectSelect ? "inline-block" : "none" }}
              id="organisation"
              name="organisation"
              className="select"
            >
              <option value="none" selected>
                None
              </option>
              {organisations.map(
                (organisation: Organisation, index: number) => (
                  <option key={index} value={organisation.id}>
                    {organisation.name}
                  </option>
                ),
              )}
            </select>
          </div>
          <Button type="submit" mode="normal">
            Add resource
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ResourcesNew;
