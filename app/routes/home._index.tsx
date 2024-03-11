import { Home } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    homes: await db.home.findMany({
      select: { id: true, name: true },
    }),
  };

  return data;
};

const HomeIndex = () => {
  const { homes } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="page-header">
        <h1>Home List</h1>
        <Link to="/home/new" className="btn">
          New Home
        </Link>
      </div>
      <ul className="home-list">
        {homes.length === 0 ? (
          <p>No homes found. Add one? ;P</p>
        ) : (
          <div className="home-container">
            {(homes as Home[]).map((home: Home) => {
              return <HomeCard home={home} key={home.id} />;
            })}
          </div>
        )}
        {/* {homes.map((home) => { */}
        {/*   return ( */}
        {/*     <li key={post.id}> */}
        {/*       <Link to={post.id.toString()}> */}
        {/*         <h3>{post.title}</h3> */}
        {/*         {new Date(post.createdAt).toLocaleDateString("en-US")} */}
        {/*       </Link> */}
        {/*     </li> */}
        {/*   ); */}
        {/* })} */}
      </ul>
    </>
  );
};

type HomeCardProps = {
  home: Home;
};

const HomeCard = ({ home }: HomeCardProps): React.ReactElement => {
  return (
    <div className="home-card">
      {home.name}
      <Link to={`/home/${home.id}`}>
        <button className="btn">View</button>
      </Link>
    </div>
  );
};

export default HomeIndex;
