/// <reference types="vite/client" />

declare module '*.svg?component' {
  import type { DefineComponent, SVGAttributes } from 'vue'
  const component: DefineComponent<SVGAttributes>
  export default component
}
