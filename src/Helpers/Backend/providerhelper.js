import API  from '../Constants/Constants';
import { post, del, get, put } from "../Api/api_helper"
// get wallets
export const getWallets = () => get(API.getBalancePoints)
export const responseReviews = (data) => post(API.responseReviews, data)

