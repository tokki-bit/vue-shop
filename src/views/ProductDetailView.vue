<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async function () {
    try {
        const id = Number(route.params.id);

        const response = await fetch(
            "http://pentina.vyatgeo.ru/lab24/api/products.php"
        );

        if (!response.ok) {
            throw new Error("Не удалось загрузить товары");
        }

        const data = await response.json();

        if (!Array.isArray(data.items)) {
            throw new Error("Неверный формат ответа сервера");
        }

        const foundProduct = data.items.find(function (item) {
            return Number(item.id) === id;
        });

        if (!foundProduct) {
            throw new Error("Товар не найден");
        }

        product.value = {
            id: Number(foundProduct.id),
            name: foundProduct.name,
            price: Number(foundProduct.price),
            inStock: Number(foundProduct.in_stock) === 1,
            categoryId: Number(foundProduct.category_id)
        };
    } catch (err) {
        error.value = err.message || "Не удалось загрузить товар. Попробуйте позже.";
    } finally {
        loading.value = false;
    }
});

function goBack() {
    router.push("/");
}
</script>

<template>
    <main class="product-detail">
        <p v-if="loading">
            Загрузка...
        </p>

        <p v-else-if="error" class="error">
            {{ error }}
        </p>

        <section v-else-if="product" class="product-info">
            <h1>{{ product.name }}</h1>

            <p class="product-price">
                Цена: {{ product.price }} ₽
            </p>

            <p v-if="product.inStock">
                В наличии
            </p>
            <p v-else>
                Нет в наличии
            </p>

            <button @click="goBack">
                Назад в каталог
            </button>
        </section>
    </main>
</template>