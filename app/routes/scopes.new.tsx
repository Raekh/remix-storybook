import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

const validateName = (name: string) => {
  if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { name } = Object.fromEntries(form.entries());
  const fieldErrors = {
    name: validateName(name.toString()),
  };
  // const user = await getLoggedInUser(request);

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json(
      {
        fieldErrors,
        fields: { name },
      },
      { status: 400 },
    );
  }

  const newScope = await db.scope.create({
    data: {
      name: name.toString(),
    },
  });
  return redirect(`/scopes/${newScope.id}`);
};

const ScopesNew = () => {
  const data = useActionData<typeof action>();
  return (
    <>
      <div className="page-header">
        <h1>Scope</h1>
        <Link to="/scopes" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <div className="error">
              <p>{data?.fieldErrors?.title ? data.fieldErrors.title : ""}</p>
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Add scope
          </button>
        </Form>
      </div>
    </>
  );
};

export default ScopesNew;
