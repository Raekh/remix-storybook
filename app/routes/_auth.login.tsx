/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionFunction, json, flash } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { createUserSession, login } from "~/utils/session.server";

const validateUsername = (username: string) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  return undefined;
};

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (/\d/.test(password) === false) {
    return "Password must contain at least one number";
  }
  return undefined;
};

const badRequest = (data: Record<string, unknown>) => {
  return json(data, { status: 401 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const fields = {
    username,
    password,
  };

  const fieldErrors = {
    username: validateUsername(username?.toString() ?? ""),
    password: validatePassword(password?.toString() ?? ""),
  };

  if (!Object.values(fields).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const user = await login({
    username: username?.toString() ?? "",
    password: password?.toString() ?? "",
  });
  if (!user) {
    return badRequest({
      fieldErrors: {
        username: "Invalid credentials",
      },
      fields,
    });
  }

  return createUserSession(user.id, "/");
};

const defaultValues = {
  username: "johnwick69",
  password: "twixrox",
};

const Login = () => {
  const actionData = useActionData<typeof action>();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Login</h1>
      </div>
      <div className="page-container">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={defaultValues.username}
            />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={defaultValues.password}
            />
            <div className="error">
              {actionData?.fieldErrors?.password &&
                actionData?.fieldErrors?.password}
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Login
          </button>
          <div>
            Don&apos;t have an account yet?
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
