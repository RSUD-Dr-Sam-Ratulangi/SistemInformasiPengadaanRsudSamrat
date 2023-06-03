import { createRouter, createWebHistory } from "vue-router";
import Homepages from "../../views/Homepages.vue";
import Vendorpages from "../../views/Vendorpages.vue";
import Productpages from "../../views/Productpages.vue";
import Productviewpage from "../../views/Productviewpage.vue";
import Productlistall from "../../views/Productlistall.vue";
import VendorList from "../../views/VendorList.vue";
import VendorUpdate from "../../views/relativeViews/VendorUpdate.vue";
import NotFoundPage from "../../views/relativeViews/NotFoundPage.vue";
import orderDetails from "../../views/orderDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Homepages",
      component: Homepages,
    },
    {
      path: "/vendorInput",
      component: Vendorpages,
    },
    {
      path: "/product",
      component: Productpages,
    },
    {
      path: "/productview",
      component: Productviewpage,
    },
    {
      path: "/productlist/:page",
      component: Productlistall,
      props: true,
    },
    {
      path: "/vendorList",
      component: VendorList,
    },
    {
      path: "/VendorUpdate/:id/:name",
      name: "VendorUpdate",
      component: VendorUpdate,
    },
    {
      path: "/orderDetails",
      component: orderDetails,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFoundPage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
