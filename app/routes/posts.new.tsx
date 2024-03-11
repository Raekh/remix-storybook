import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { getLoggedInUser } from "~/utils/session.server";

const validateTitle = (title: string) => {
  if (title.length < 3) {
    return "Title must be at least 3 characters long";
  }
};

const validatebody = (body: string) => {
  if (body.length < 10) {
    return "Body must be at least 10 characters long";
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { title, body } = Object.fromEntries(form.entries());
  const fieldErrors = {
    title: validateTitle(title.toString()),
    body: validatebody(body.toString()),
  };
  const user = await getLoggedInUser(request);

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json(
      {
        fieldErrors,
        fields: { title, body },
      },
      { status: 400 },
    );
  }

  const newPost = await db.post.create({
    data: {
      title: title.toString(),
      body: body.toString(),
      userId: user.id,
    },
  });
  return redirect(`/posts/${newPost.id}`);
};

const PostsNew = () => {
  const data = useActionData<typeof action>();
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error">
              <p>{data?.fieldErrors?.title ? data.fieldErrors.title : ""}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea name="body" id="body" />
            <div className="error">
              <p>{data?.fieldErrors?.body ? data.fieldErrors.body : ""}</p>
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Add post
          </button>
        </Form>
      </div>
    </>
  );
};

export default PostsNew;
