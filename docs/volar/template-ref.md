# templateRef

<StabilityLevel level="experimental" />

Automatically add type for `templateRef` and `useTemplateRef` <small>(vue3.5)</small>.

|   Features   |     Supported      |
| :----------: | :----------------: |
| Volar Plugin | :white_check_mark: |

## Basic Usage

::: code-group

```vue [App.vue] twoslash
<script setup lang="ts">
// #region comp
import { defineComponent } from 'vue'

export const Comp = defineComponent({
  setup() {
    return { foo: 1 }
  },
})
// #endregion comp
// ---cut---
// @noErrors
import { Comp } from './Comp.ts'
import { templateRef } from '@vueuse/core'

const comp = templateRef('comp')
comp.value?.foo
//           ^?
</script>

<template>
  <Comp ref="comp" />
</template>
```

<<< ./template-ref.md#comp{ts} [Comp.ts]

:::

## Volar Configuration

```jsonc {5,13}
// tsconfig.json
{
  "vueCompilerOptions": {
    "plugins": [
      "@vue-macros/volar/template-ref",
      // ...more feature
    ],
    "vueMacros": {
      "templateRef": {
        /**
         * @default ["templateRef", "useTemplateRef"]
         */
        "alias": ["templateRef"],
      },
    },
  },
}
```
