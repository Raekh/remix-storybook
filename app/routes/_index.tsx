import { Link } from "@remix-run/react";

const Index = () => {
  return (
    <div>
      <h1>Welcome</h1>

      <p>
        Head over to{" "}
        <Link style={{ color: "red", textDecoration: "underline" }} to="/users">
          Users
        </Link>{" "}
        to see the users list.
      </p>
    </div>
  );
};

export default Index;
