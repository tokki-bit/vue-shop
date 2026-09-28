<script setup>
defineProps({
    modelValue: String
})

const emit = defineEmits(["search"])
</script>

<template>
    <input
        type="text"
        :value="modelValue"
        @input="emit('search', $event.target.value)"
        placeholder="Поиск по названию"
    >
</template>