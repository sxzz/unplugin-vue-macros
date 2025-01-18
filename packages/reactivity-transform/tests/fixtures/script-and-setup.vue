<script lang="ts">
let foo = $ref('msg')
foo = 'world'
</script>

<script setup lang="ts">
foo = 'foo'
</script>

<template>
  <div>
    {{ foo }}
  </div>
</template>
