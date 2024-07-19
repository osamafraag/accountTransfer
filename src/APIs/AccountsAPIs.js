import { BaseUrl } from "./Config";

export const Accounts = (page,search) => {
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

export const DeleteAccount = (id) => {
  return BaseUrl.delete(`accounts/${id}`)
}