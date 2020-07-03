import VueRouter from "vue-router";
import Bookables from "./bookables/Boakables";
import Bookable from "./bookable/Bookable";
import Example2 from "./components/Example2";
import Review from "./review/Review";
import Basket from "./basket/Basket";

const routes = [{
        path: "/",
        component: Bookables,
        name: "home"
    },
    {
        path: "/bookable/:id",
        component: Bookable,
        name: "bookable"
    },
    {
        path: "/second",
        component: Example2,
        name: "second"
    },
    {
        path: "/review/:id",
        component: Review,
        name: "review"
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
