export function useExpose<T extends Record<string, any>>(
  i: any,
  exposed: T,
): T {
  if (i) {
    i.exposed = exposed
    if (i.vnode) i.vnode.shapeFlag = 4
  }
  return exposed
}
