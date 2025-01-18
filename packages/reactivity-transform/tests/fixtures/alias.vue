<script setup>
const { foo: propAlias, baz: propAlias2 } = defineProps({
  foo: String,
  baz: Number,
})
</script>

<template>
  {{ propAlias }}
  {{ propAlias2 }}
</template>
