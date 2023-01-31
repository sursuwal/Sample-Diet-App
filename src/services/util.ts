export const checkEmailIsValid = (email: string) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

export const checkPasswordIsValid = (email: string) => {
  return (/(.*[a-z]){3}/i.test(email))
}
