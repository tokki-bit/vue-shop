import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "./views/ProductListView.vue";
import ProductDetailView from "./views/ProductDetailView.vue";

const routes = [
    {
        path: "/",
        component: ProductListView
    },
    {
        path: "/product/:id",
        component: ProductDetailView
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});