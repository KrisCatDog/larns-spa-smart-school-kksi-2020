export default function guest({ next, authenticated }) {
  if (authenticated) {
    return next({
      name: "Classrooms",
    });
  }

  return next();
}
