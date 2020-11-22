import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/classrooms",
    name: "Classrooms",
    component: () => import("../views/Classrooms.vue"),
  },
  {
    path: "/classrooms/:id/attendances",
    name: "Attendances",
    component: () => import("../views/Attendances.vue"),
  },
  {
    path: "/classrooms/:id/assignments",
    name: "Assignments",
    component: () => import("../views/Assignments.vue"),
  },
  {
    path: "/classrooms/:id/announcements",
    name: "Announcements",
    component: () => import("../views/Announcements.vue"),
  },
  {
    path: "/classrooms/:id/learning-videos",
    name: "LearningVideos",
    component: () => import("../views/LearningVideos.vue"),
  },
  {
    path: "/classrooms/:id/exams",
    name: "Exams",
    component: () => import("../views/Exams.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
