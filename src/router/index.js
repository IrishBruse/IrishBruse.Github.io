import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Projects from "../views/Projects.vue";
import PageNotFound from "../views/404.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/contact",
        name: "Contact",
        title: "Contact",
        component: Contact,
    },
    {
        path: "/projects/:project",
        name: "Projects",
        title: "Projects",
        component: Projects,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        title: "Page not found",
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    document.title = process.env.VUE_APP_TITLE + " - " + to.name;
    next();
});

export default router;
