import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Profile from "@/views/Profile.vue";
import TimelineCalendarView from "@/views/TimelineCalendarView.vue";
import TaskList from "@/components/TaskList.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/timeline-calendar",
      name: "TimelineCalendarView",
      component: TimelineCalendarView,
    },
    {
      path: "/tasklist",
      name: "Tasklist",
      component: TaskList,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "*",
      redirect: "/", // Redirect unknown routes to home
    },
  ],
});

export default router;
