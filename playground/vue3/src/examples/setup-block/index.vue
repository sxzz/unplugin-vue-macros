<setup>
import { ref } from 'vue'
const msg = ref('Hello World')
</setup>

<template>
  <div>setupBlock</div>
  <!-- @vue-expected-error -->
  {{ msg }}
</template>
