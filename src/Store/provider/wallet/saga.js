import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_WALLET } from "./actionTypes"
import { getWalletSuccess, getWalletFail } from "./action"

//Include Both Helper File with needed methods
import { getWallets } from "../../Helpers/Backend/providerhelper"

function* fetchWallet() {
  try {
    const response = yield call(getWallets)
    console.log('walletsaga',response)
    yield put(getWalletSuccess(response))
  } catch (error) {
    yield put(getWalletFail(error))
  }
}
function* walletSaga() {
  yield takeEvery(GET_WALLET, fetchWallet)
}
export default walletSaga
