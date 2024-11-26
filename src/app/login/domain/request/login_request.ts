export interface LoginRequest {
  username: string
  password: string
  recaptcha_token: string
}

export interface RegisterRequest {
  p_username:string
  p_email:string
  p_password:string
  p_doi_cod:string
  p_doi_number:string
}
