import bcrypt from "bcrypt";
import { db } from "./db.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

type LoginProps = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: LoginProps) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) {
    return null;
  }

  return user;
};

export const register = async ({ username, password }: LoginProps) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return db.user.create({
    data: {
      username,
      passwordHash,
    },
  });
};

export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/logout", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("No session secret provided");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "remixblog_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
    httpOnly: true,
  },
});

export const consumeFlash = async (key: string) => {
  const session = await storage.getSession();
  session.unset(key);
  await storage.commitSession(session);
};

export const commitSession = storage.commitSession;

export const getFlash = async (key: string) => {
  const session = await storage.getSession();
  const flash = session.get(key);
  const flash2 = session.get(key);
  const flash3 = session.get(key);
  const flash4 = session.get(key);
  const flash5 = session.get(key);
  console.log({ flash, flash2, flash3, flash4, flash5 });

  return flash;
};

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.flash("message", "login_success");
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const getLoggedInUser = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = await session.get("userId");
  if (!userId) {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};
