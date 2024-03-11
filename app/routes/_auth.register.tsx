/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { createUserSession, register } from "~/utils/session.server";

const validateUsername = (username: string) => {};

const validatePassword = (password: string) => {};

const badRequest = (data: Record<string, unknown>) => {
  return json(data, { status: 401 });
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const registerType = form.get("registerType");
  const fields = {
    username,
    password,
    registerType,
  };

  const fieldErrors = {
    username: validateUsername(username?.toString() ?? ""),
    password: validatePassword(password?.toString() ?? ""),
  };

  if (!Object.values(fields).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const userExists = await db.user.findFirst({
    where: {
      username: username?.toString() ?? "",
    },
  });

  if (userExists) {
    return badRequest({
      fieldErrors: {
        username: `Username ${username}  already exists`,
      },
      fields,
    });
  }

  const newUser = await register({
    username: username?.toString() ?? "",
    password: password?.toString() ?? "",
  });

  if (!newUser) {
    return badRequest({
      fields,
      formError: "Something went wrong",
    });
  }
  return createUserSession(newUser.id, "/posts");
};

const Register = () => {
  const actionData = useActionData<typeof action>();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Register</h1>
      </div>
      <div className="page-container">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div className="error">
              {actionData?.fieldErrors?.password &&
                actionData?.fieldErrors?.password}
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Register
          </button>
          <div>
            Already have an account?
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
