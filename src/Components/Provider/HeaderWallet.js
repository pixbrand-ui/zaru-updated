import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { getWallet } from '../../Store/wallet/action'
import { Svg } from "../../Assets/Svgs/Svg";

const HeaderWallet = props => {
  const { wallet, onGetWallets } = props

  useEffect(() => {
    onGetWallets()
  }, [onGetWallets])


  return (
    <React.Fragment>
      <span>{wallet && wallet.points}</span>
    </React.Fragment>
  )
}

HeaderWallet.propTypes = {
  wallets: PropTypes.array,
  onGetWallets: PropTypes.func,
}

const mapStateToProps = ({ wallet }) => ({
  wallet: wallet.wallet.data && wallet.wallet.data,
})

const mapDispatchToProps = dispatch => ({
  onGetWallets: () => dispatch(getWallet()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderWallet))