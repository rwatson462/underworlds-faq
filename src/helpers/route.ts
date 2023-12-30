import type { RouteName } from '@/router/routes'

export const route = (name: RouteName, props: {} = {}) => ({
  name,
  props
})
