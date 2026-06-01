/** Navbar / mobile CTA: products when logged in, else login with return to catalog */
export const PRODUCTS_LOGIN_RETURN = encodeURIComponent('/products')

export function getQuoteNavPath(isLoggedInCustomer: boolean): string {
  return isLoggedInCustomer ? '/products' : `/login?return=${PRODUCTS_LOGIN_RETURN}`
}
