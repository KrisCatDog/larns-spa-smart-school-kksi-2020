import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "./middlewarePipeline";
import auth from "./middleware/auth";
import guest from "./middleware/guest";

import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/SignIn.vue"),
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/SignUp.vue"),
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/classrooms",
    name: "Classrooms",
    component: () => import("../views/Classrooms.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:id/attendances",
    name: "Attendances",
    component: () => import("../views/Attendances.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:id/assignments",
    name: "Assignments",
    component: () => import("../views/Assignments.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:id/announcements",
    name: "Announcements",
    component: () => import("../views/Announcements.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:id/learning-videos",
    name: "LearningVideos",
    component: () => import("../views/LearningVideos.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:id/exams",
    name: "Exams",
    component: () => import("../views/Exams.vue"),
    meta: {
      middleware: [auth],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    authenticated: localStorage.getItem("authToken") ? true : false,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
