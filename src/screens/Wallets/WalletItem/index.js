import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { Circle as Progress } from 'react-native-progress'

import { BITCOIN, ETHEREUM, IOTA } from 'ellacrypto/src/constants/ico'

import styles, { loaderStyles } from './styles'
import { colors } from 'ellacrypto/src/constants/styles'
import { getWalletAddressBalance as btcBalance, fiatEquivalent } from 'ellacrypto/src/services/apis/btc'
import { getWalletAddressBalance as ethereumBalance } from 'ellacrypto/src/services/apis/eth'


class WalletItem extends React.Component {
  state = {}

  componentWillMount = () => {
    this.refreshIcoBalance()
  }

  refreshIcoBalance = async () => {
    switch (this.props.ico) {
      case BITCOIN:
        const { confirmedBalanceInBTC, pendingBalanceInBTC } = await btcBalance(this.props.address)
        this.setState({ icoBalance: confirmedBalanceInBTC }, this.refreshFiatBalance)
        break
      case ETHEREUM:
        const { confirmedBalance, pendingBalance } = await ethereumBalance(this.props.address)
        this.setState({ icoBalance: confirmedBalance }, this.refreshFiatBalance)
        break
      case IOTA:
        break
      default:
        console.error('Unrecognized ico: ' + this.props.ico)
        break
    }
  }

  refreshFiatBalance = async () => {
    switch (this.props.ico) {
      case BITCOIN:
        const fiatBalance = await fiatEquivalent(this.state.icoBalance)
        this.setState({ fiatBalance })
      case ETHEREUM:
        return 0
      case IOTA:
        return 0
      default:
        console.error('Unrecognized ico: ' + this.props.ico)
        return 0
    }
  }

  getIcoBalance = () => (
    this.state.icoBalance !== undefined ?
      <Text style={styles.icoBalance}>{this.state.icoBalance} {this.props.ico}</Text>
      : <Progress indeterminate={true} size={loaderStyles.size} color={loaderStyles.color} />
  )

  getFiatBalance = () => (
    this.state.fiatBalance !== undefined ?
      <Text style={styles.fiatBalance}>{this.state.fiatBalance} #USD#</Text>
      : <Progress indeterminate={true} size={loaderStyles.size} color={loaderStyles.color} />
  )

  render = () => (
    <TouchableOpacity onPress={this.props.onPress}>
      <View style={styles.walletItem}>
        <View style={styles.walletInfo}>
          <Text style={styles.alias}>[{this.props.ico}] {this.props.alias}</Text>
          <Text style={styles.address}>{this.props.address}</Text>
        </View>
        <View style={styles.walletBalance}>
          {this.getIcoBalance()}
          {this.getFiatBalance()}
        </View>
      </View>
    </TouchableOpacity>
  )
}

WalletItem.propTypes = {
  ico: PropTypes.oneOf(['BTC', 'ETH', 'IOT']),
  address: PropTypes.string.isRequired,
  alias: PropTypes.string,
  onPress: PropTypes.func,
}

WalletItem.defaultProp = {
  alias: undefined,
  onPress: () => {},
}

export default WalletItem
