import React, { Component } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View,
  Text,
} from 'react-native'
// import { BarIndicator } from 'react-native-indicators';
import { Circle as Progress } from 'react-native-progress'
import { Actions } from "react-native-router-flux"
import I18n from 'ex-react-native-i18n'
import Currency from 'react-currency-formatter'
import Button from 'apsl-react-native-button'

import { WALLET_ADDRESS } from 'ellacrypto/src/constants/storageKeys'
import { colors, styles as baseStyles } from 'ellacrypto/src/constants/styles'
import { styles as viewStyles } from './styles'
import { getWalletAddressBalance, getExchangeRate } from 'ellacrypto/src/services/apis/btc'


const styles = StyleSheet.create({
  currentBalance: {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 36,
    textAlign: 'center',
  },
  pendingBalance: {
    textAlign: 'right',
    fontSize: 12,
  },
  fiatEquivalent: {
    fontFamily: 'HelveticaNeue',
    fontSize: 48,
    textAlign: 'center',
    marginTop: 40,
  },
  refreshButton: {
    position: 'absolute',
    alignSelf: 'center',
    width: 200,
    marginBottom: 20,
    bottom: 0,
  }
})

export default class WalletInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletAddress: this.props.walletAddress,
      refreshingData: false,
    }
  }

  async componentWillMount() {
    if (this.state.walletAddress) {
      this.loadWalletDataFromBlockhain()
    } else {
      this.readWalletAddressFromStorage()
    }
  }

  async readWalletAddressFromStorage() {
    try {
      const walletAddress = await AsyncStorage.getItem(WALLET_ADDRESS)
      if (walletAddress !== null) {
        this.setState({ walletAddress })
        this.loadWalletDataFromBlockhain()
      } else {
        Actions.addWallet()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async loadWalletDataFromBlockhain(callback) {
    const { confirmedBalanceInBTC, pendingBalanceInBTC } = await getBtcWalletAddressBalance(this.state.walletAddress)
    this.setState({ confirmedBalanceInBTC, pendingBalanceInBTC })

    const { usdExchangeRate, eurExchangeRate, cnyExchangeRate } = await getExchangeRate()
    this.setState({ hasExchangeRate: true, usdExchangeRate, eurExchangeRate, cnyExchangeRate })

    if (callback) {
      callback()
    }
  }

  getAfterConfirmBalance() {
    return this.state.confirmedBalanceInBTC + this.state.pendingBalanceInBTC
  }

  getExchangedValue() {
    return this.state.usdExchangeRate * this.getAfterConfirmBalance()
  }

  renderWalletBalance() {
    return (
      <View style={baseStyles.container}>
        <Text style={baseStyles.title}>{I18n.t('walletInfo.title')}</Text>
        <Text style={styles.currentBalance}>{`${this.getAfterConfirmBalance()} ${I18n.t('crypto.bitcoin.symbol')}`}</Text>
        <Text style={[baseStyles.secondaryText, styles.pendingBalance]}>{I18n.t('walletInfo.unconfirmedTransactions')}</Text>
        <Text style={[baseStyles.secondaryText, styles.pendingBalance]}>{this.state.pendingBalanceInBTC}</Text>
        {this.renderExchangeRateConversion()}
        {this.renderRefreshButton()}
      </View>
    )
  }

  renderExchangeRateConversion() {
    if (!this.state.hasExchangeRate) {
      return (
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Progress indeterminate={true} color={colors.secondaryText} thickness={1} size={20} />
        </View>
      )
    } else {
      return (
        <Text style={styles.fiatEquivalent}>
          <Currency
            quantity={this.getExchangedValue()}
            currency="USD"
          />
        </Text>
      )
    }
  }

  refreshWalletBalance() {
    this.setState({ refreshingData: true })
    this.loadWalletDataFromBlockhain(() => {
      this.setState({ refreshingData: false })
    })
  }

  renderRefreshButton() {
    return (
      <Button
        style={[baseStyles.secondaryButton, styles.refreshButton]}
        textStyle={baseStyles.secondaryButtonText}
        onPress={() => this.refreshWalletBalance() }
        accessibilityLabel="Refresh wallet status"
      >
        {this.renderRefreshButtonText()}
      </Button>
    )
  }

  renderRefreshButtonText() {
    if (this.state.refreshingData) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Progress indeterminate={true} color={viewStyles.secondaryButton.color} size={20} thickness={1} />
        </View>
      )
    } else {
      return I18n.t('walletInfo.refreshButton')
    }
  }

  renderLoading() {
    return (
      <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
        <Progress indeterminate={true} color={colors.secondaryText} />
      </View>
    )
  }

  render() {
    if (this.state.confirmedBalanceInBTC == null) {
      return this.renderLoading()
    }

    return this.renderWalletBalance()
  }
}
