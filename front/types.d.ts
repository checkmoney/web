declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module 'next-redirect' {
  type Redirect = (ctx: any, route: string) => Promise<void>
  const redirect: redirect
  export default redirect
}
