import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import globalStyles from "../styles/global.css";

import tailwind from "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: tailwind },
];

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
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          <li>
            <Link to="/users">Users</Link>
          </li>
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
