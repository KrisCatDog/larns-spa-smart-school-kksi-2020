export default function auth({ next, authenticated }) {
  if (!authenticated) {
    return next({
      name: "Signin",
    });
  }

  return next();
}
