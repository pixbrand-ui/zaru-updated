import { GET_WALLET, GET_WALLET_SUCCESS, GET_WALLET_FAIL } from "./actionTypes"
export const getWallet = () => ({
  type: GET_WALLET,
})
export const getWalletSuccess = wallet => ({
  type: GET_WALLET_SUCCESS,
  payload: wallet,
})

export const getWalletFail = error => ({
  type: GET_WALLET_FAIL,
  payload: error,
})
