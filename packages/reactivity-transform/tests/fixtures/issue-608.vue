<script setup lang="ts">
import { isRef } from 'vue'

let ref = $ref('value')
console.log(isRef(ref))

try {
} catch {
  const ref = ''
}

console.log(isRef(ref))
</script>
