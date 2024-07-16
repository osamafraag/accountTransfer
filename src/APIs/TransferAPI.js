import { BaseUrl } from "./Config";

export const Transfer = (data) => {
    return BaseUrl.post('accounts/transfer/', data)
}