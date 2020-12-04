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
      title: "Home",
      middleware: [guest],
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/SignIn.vue"),
    meta: {
      title: "Sign In",
      middleware: [guest],
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/SignUp.vue"),
    meta: {
      title: "Sign Up",
      middleware: [guest],
    },
  },
  {
    path: "/classrooms",
    name: "Classrooms",
    component: () => import("../views/Classrooms.vue"),
    meta: {
      title: "Classrooms",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/attendances",
    name: "Attendances",
    component: () => import("../views/Attendances.vue"),
    meta: {
      title: "Attendances - Classroom",
      middleware: [auth],
    },
  },
  {
    path:
      "/classrooms/:classroomId/attendances/:attendanceId/attendance-responds",
    name: "AttendanceResponds",
    component: () => import("../views/AttendanceResponds.vue"),
    meta: {
      title: "Attendance Responds - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/assignments",
    name: "Assignments",
    component: () => import("../views/Assignments.vue"),
    meta: {
      title: "Assignments - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/assignments/:assignmentId",
    name: "AssignmentDetail",
    component: () => import("../views/AssignmentDetail.vue"),
    meta: {
      title: "Assignment Detail - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/assignments/:assignmentId/results",
    name: "AssignmentResults",
    component: () => import("../views/AssignmentResults.vue"),
    meta: {
      title: "Assignment Results - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/announcements",
    name: "Announcements",
    component: () => import("../views/Announcements.vue"),
    meta: {
      title: "Announcements - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/announcements/:announcementId",
    name: "AnnouncementDetail",
    component: () => import("../views/AnnouncementDetail.vue"),
    meta: {
      title: "Announcement Detail - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/learning-videos",
    name: "LearningVideos",
    component: () => import("../views/LearningVideos.vue"),
    meta: {
      title: "Learning Videos - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/learning-videos/:learningVideoId",
    name: "LearningVideoDetail",
    component: () => import("../views/LearningVideoDetail.vue"),
    meta: {
      title: "Learning Video Detail - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/exams",
    name: "Exams",
    component: () => import("../views/Exams.vue"),
    meta: {
      title: "Exams - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/discussions",
    name: "Discussions",
    component: () => import("../views/Discussions.vue"),
    meta: {
      title: "Discussions - Classroom",
      middleware: [auth],
    },
  },
  {
    path: "/classrooms/:classroomId/discussions/:questionId",
    name: "DiscussionDetail",
    component: () => import("../views/DiscussionDetail.vue"),
    meta: {
      title: "Discussion Detail - Classroom",
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

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle)
    document.title = nearestWithTitle.meta.title + " | larns";

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
