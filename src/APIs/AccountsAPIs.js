import { BaseUrl } from "./Config";

export const Accounts = (page,search) => {
    // return BaseUrl.get(`accounts?page=${page}&search=${search}`)
    let url = 'accounts/';
    const params = {};

    if (page !== null) {
      params.page = page;
    }

    if (search !== null) {
      params.search = search;
    }

    return BaseUrl.get(url, { params });
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