<script setup>
defineProps({
    id: Number,
    name: String,
    price: Number,
    inStock: Boolean,
    inCart: Boolean
})

const emit = defineEmits(["add-to-cart"])
</script>

<template>
    <div class="product-card">
        <h3>{{ name }}</h3>
        <p>Цена: {{ price }} ₽</p>

        <p v-if="inStock">В наличии</p>
        <p v-else>Нет в наличии</p>

        <button
            @click="emit('add-to-cart', id)"
            :disabled="inCart"
        >
            {{ inCart ? "В корзине" : "В корзину" }}
        </button>
    </div>
</template>

<style scoped>
.product-card {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
}
</style>