import { BaseUrl } from "./Config";

export const Accounts = (page,search) => {
    return BaseUrl.get(`accounts?page=${page}&search=${search}`)
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