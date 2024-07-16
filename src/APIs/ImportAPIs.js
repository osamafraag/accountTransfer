import { BaseUrl } from "./Config";

export const Import = (data) => {
    return BaseUrl.post('accounts/import/', data)
}