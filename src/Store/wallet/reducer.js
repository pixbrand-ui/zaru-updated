import { GET_WALLET_SUCCESS, GET_WALLET_FAIL } from "./actionTypes"

const INIT_STATE = {
  wallet: [],
  error: {},
}

const wallet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.payload,
      }
    case GET_WALLET_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
export default wallet
