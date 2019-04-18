import Cookies from 'js-cookie'

export const resetCookie = () => Cookies.remove('token')
