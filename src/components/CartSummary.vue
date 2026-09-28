<script setup>
import { computed } from "vue";

const props = defineProps({
    cartProducts: Array
});

const cartCount = computed(() => {
    return props.cartProducts.length;
});

const cartTotal = computed(() => {
    return props.cartProducts.reduce((sum, product) => {
        return sum + product.price;
    }, 0);
});
</script>

<template>
    <div class="cart-summary">
        <h2>Корзина</h2>
        <p>Количество товаров: {{ cartCount }}</p>
        <p>Сумма заказа: {{ cartTotal }} ₽</p>
    </div>
</template>

<style scoped>
.cart-summary {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 20px 0;
    border-radius: 8px;
}
</style>