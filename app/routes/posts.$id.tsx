import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { getLoggedInUser } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getLoggedInUser(request);

  const post = await db.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    throw new Error(`Post not found: ${params.id}`);
  }

  return { post, user };
};

export const action: ActionFunction = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const user = await getLoggedInUser(request);

    const post = await db.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      throw new Error(`Post not found: ${params.id}`);
    }

    console.log({ user, post });

    if (user && post.userId === user.id) {
      await db.post.delete({
        where: { id: params.id },
      });
    }

    return redirect("/posts");
  }
};

const PostsNew = () => {
  const { post, user } = useLoaderData<typeof loader>();
  console.log({ post, user });
  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to="/posts/" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">{post.body}</div>

      <div className="page-footer">
        {user.id === post.userId && (
          <Form method="POST">
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" className="btn btn-delete">
              Delete
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default PostsNew;
