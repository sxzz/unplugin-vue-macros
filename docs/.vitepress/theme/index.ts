import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import { GroupIconComponent } from 'vitepress-plugin-group-icons/client'
import Theme from 'vitepress/theme'
import PackageVersion from '../components/PackageVersion.vue'
import StabilityLevel from '../components/StabilityLevel.vue'
import WarnBadge from '../components/WarnBadge.vue'
import Layout from './Layout.vue'
import rspack from './rspack.svg?raw'
import type { EnhanceAppContext } from 'vitepress'
import './style.css'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('WarnBadge', WarnBadge)
    app.component('StabilityLevel', StabilityLevel)
    app.component('PackageVersion', PackageVersion)
    app.use(NolebaseGitChangelogPlugin)
    app.use(TwoslashFloatingVue)
    app.use(GroupIconComponent, {
      rspack,
    })
  },
}
