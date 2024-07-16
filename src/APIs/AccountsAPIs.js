import { BaseUrl } from "./Config";

export const Accounts = () => {
    return BaseUrl.get('accounts/')
}

export const GetAccount = (id) => {
    return BaseUrl.get(`accounts/${id}`)
}

export const UpdateAccount = (id, data) => {
  return BaseUrl.put(`accounts/${id}`, data)
}

export const DeleteAccount = (id) => {
  return BaseUrl.delete(`accounts/${id}`)
}