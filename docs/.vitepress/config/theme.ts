import { docsLink, githubLink } from '../../../macros/repo'
import { createTranslate } from '../i18n/utils'
import type { DefaultTheme, HeadConfig, LocaleConfig } from 'vitepress'

export function getLocaleConfig(lang: string) {
  const t = createTranslate(lang)

  const urlPrefix = lang && lang !== 'en' ? (`/${lang}` as const) : ''
  const title = t('Vue Macros')
  const description = t('Explore more macros and syntax sugar to Vue.')

  const head: HeadConfig[] = [
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${docsLink}/og.png` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: docsLink }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: `${docsLink}/og.png` }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#914796' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-29NKGSL23C',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', 'G-29NKGSL23C')`,
    ],
  ]

  const nav: DefaultTheme.NavItem[] = [
    {
      text: t('Guide'),
      link: `${urlPrefix}/guide/getting-started`,
      activeMatch: 'guide',
    },
    {
      text: t('Macros'),
      link: `${urlPrefix}/macros/`,
      activeMatch: 'macros',
    },
    {
      text: t('Features'),
      link: `${urlPrefix}/features/hoist-static`,
      activeMatch: 'features',
    },
    {
      text: 'Volar',
      link: `${urlPrefix}/volar/template-ref`,
      activeMatch: 'volar',
    },
    {
      text: t('Example'),
      link: `${urlPrefix}/interactive/`,
      activeMatch: 'interactive',
    },
  ]

  const sidebar: DefaultTheme.SidebarItem[] = [
    {
      text: t('Guide'),
      base: urlPrefix,
      items: [
        {
          text: t('Getting Started'),
          link: `/guide/getting-started`,
        },
        {
          text: t('Bundler Integration'),
          link: `/guide/bundler-integration`,
        },
        {
          text: t('Nuxt Integration'),
          link: `/guide/nuxt-integration`,
        },
        {
          text: t('Astro Integration'),
          link: `/guide/astro-integration`,
        },
        {
          text: t('ESLint Integration'),
          link: '/guide/eslint-integration',
        },
        {
          text: t('Configurations'),
          link: `/guide/configurations`,
        },
        {
          text: t('Interactive Example'),
          link: `/interactive`,
        },
      ],
    },
    {
      text: t('Macros'),
      base: `${urlPrefix}/macros`,
      items: [
        {
          text: t('All Macros'),
          link: `/`,
        },

        {
          text: t('Official'),
          items: [
            {
              text: 'defineOptions',
              link: `/define-options`,
            },
            {
              text: 'defineSlots',
              link: `/define-slots`,
            },
            {
              text: 'shortEmits',
              link: `/short-emits`,
            },
          ],
        },

        {
          text: t('Stable'),
          items: [
            {
              text: 'defineModels',
              link: `/define-models`,
            },
            {
              text: 'defineProps',
              link: `/define-props`,
            },
            {
              text: 'definePropsRefs',
              link: `/define-props-refs`,
            },
            {
              text: 'defineRender',
              link: `/define-render`,
            },
            {
              text: 'shortVmodel',
              link: `/short-vmodel`,
            },
          ],
        },

        {
          text: t('Experimental'),
          items: [
            {
              text: 'defineProp',
              link: `/define-prop`,
            },
            {
              text: 'defineEmit',
              link: `/define-emit`,
            },
            {
              text: 'setupComponent',
              link: `/setup-component`,
            },
            {
              text: 'setupSFC',
              link: `/setup-sfc`,
            },
            {
              text: 'chainCall',
              link: `/chain-call`,
            },
            {
              text: 'defineStyleX',
              link: `/define-stylex`,
            },
            {
              text: 'jsxMacros',
              link: `/jsx-macros`,
            },
          ],
        },
      ],
    },
    {
      text: t('Features'),
      base: `${urlPrefix}/features`,
      items: [
        {
          text: t('Official'),
          items: [
            {
              text: 'hoistStatic',
              link: `/hoist-static`,
            },
            {
              text: 'shortBind',
              link: `/short-bind`,
            },
          ],
        },

        {
          text: t('Stable'),
          items: [
            {
              text: 'betterDefine',
              link: `/better-define`,
            },
            {
              text: 'reactivityTransform',
              link: `/reactivity-transform`,
            },
            {
              text: 'jsxDirective',
              link: `/jsx-directive`,
            },
          ],
        },

        {
          text: t('Experimental'),
          items: [
            {
              text: 'namedTemplate',
              link: `/named-template`,
            },
            {
              text: 'exportProps',
              link: `/export-props`,
            },
            {
              text: 'exportExpose',
              link: `/export-expose`,
            },
            {
              text: 'exportRender',
              link: `/export-render`,
            },
            {
              text: 'booleanProp',
              link: `/boolean-prop`,
            },
            {
              text: 'scriptLang',
              link: `/script-lang`,
            },
          ],
        },
      ],
    },
    {
      text: 'Volar',
      base: `${urlPrefix}/volar`,
      items: [
        {
          text: t('Official'),
          items: [
            {
              text: 'templateRef',
              link: `/template-ref`,
            },
          ],
        },
        {
          text: t('Stable'),
          items: [
            {
              text: 'setupJsdoc',
              link: `/setup-jsdoc`,
            },
            {
              text: 'defineGeneric',
              link: `/define-generic`,
            },
          ],
        },
        {
          text: t('Experimental'),
          items: [
            {
              text: 'scriptSFC',
              link: `/script-sfc`,
            },
            {
              text: 'jsxRef',
              link: `/jsx-ref`,
            },
          ],
        },
      ],
    },
  ]

  const themeConfig: DefaultTheme.Config = {
    logo: '/favicon.svg',
    nav,
    sidebar,
    socialLinks: [
      { icon: 'discord', link: 'https://discord.com/invite/RbVHMsFVXU' },
      { icon: 'github', link: githubLink },
      { icon: 'bluesky', link: 'https://bsky.app/profile/vue-macros.dev' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2m-3.566 15.604a27 27 0 0 0 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4c-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5C5.56 5 4 6.657 4 9c0 2.944 1.666 5.533 4.645 7.903c.745.593 1.54 1.146 2.421 1.7c.299.189.595.37.934.572c.339-.202.635-.383.934-.571"/></svg>',
        },
        link: 'https://github.com/sponsors/vue-macros',
      },
    ],
    footer: {
      message: t('Made with ❤️'),
      copyright:
        'MIT License © 2022-PRESENT<br /><a href="https://github.com/sxzz">三咲智子 Kevin Deng</a> & Vue Macros Contributors',
    },
    editLink: {
      pattern: `${githubLink}/edit/main/docs/:path`,
      text: t('Edit this page on GitHub'),
    },
  }

  if (lang === 'zh-CN') {
    Object.assign(themeConfig, {
      outline: {
        label: '页面导航',
      },
      lastUpdatedText: '最后更新于',
      darkModeSwitchLabel: '外观',
      sidebarMenuLabel: '目录',
      returnToTopLabel: '返回顶部',
      langMenuLabel: '选择语言',
      docFooter: {
        prev: '上一页',
        next: '下一页',
      },
    } satisfies DefaultTheme.Config)
  }

  const localeConfig: LocaleConfig<DefaultTheme.Config>[string] = {
    label: t('English'),
    lang: t('en'),
    title,
    description,
    head,
    themeConfig,
  }

  return localeConfig
}
