import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import globalStyles from "../styles/global.css";
import { default as NotificationProvider } from "./contexts/NotificationContext";
import {
  commitSession,
  getLoggedInUser,
  getUserSession,
} from "./utils/session.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);
  const session = await getUserSession(request);
  const message = session.get("message") || null;
  session.set("message", null);
  await commitSession(session);
  console.log({ message });
  return {
    user,
    message,
  };
};

export default function App(): React.ReactElement {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children }: PropsWithChildren): React.ReactElement => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NotificationProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NotificationProvider>
      </body>
    </html>
  );
};

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const { user } = useLoaderData<typeof loader>();
  // useEffect(() => {
  //   if (message === "login_success" && !toasted) {
  //     setToasted(true);
  //     toast.success("Logged in successfully", { id: message });
  //   } else {
  //     setToasted(false);
  //   }
  // }, [message]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          {user ? (
            <>
              <li>
                <Link to="/requests">requests</Link>
              </li>
              <li>
                <Link to="/scopes">scopes</Link>
              </li>
              <li>
                <Form action="/logout" method="POST">
                  <button className="btn" type="submit">
                    Logout
                  </button>
                </Form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="container">
        <Toaster position="bottom-right" />
        {children}
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorBoundary = (props: any) => {
  const message = props?.error?.message ?? "Something went wrong";

  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{message}</p>
      </Layout>
    </Document>
  );
};
