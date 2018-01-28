import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  // AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { Camera, Permissions } from 'expo'
import { Actions } from "react-native-router-flux"
// import Button from 'apsl-react-native-button'
import { Kohana } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import SnackBar from 'react-native-snackbar-dialog'

import { WALLETS } from 'ellacrypto/src/constants/storageKeys'
import { WALLET_EXIST, WALLET_ADDED } from 'ellacrypto/src/constants/status'

import styles from './styles'
import { styles as baseStyles } from 'ellacrypto/src/constants/styles'
import { addWallet } from 'ellacrypto/src/services/storage/wallets'
import Button from 'ellacrypto/src/components/Button'
import { colors } from 'ellacrypto/src/constants/styles'


export default class AddWallet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: Camera.Constants.Type.back,
      hasCameraPermission: null,
      walletAddress: this.props.walletAddress,
      walletCrypto: this.props.walletCrypto,
    }

    this.navigateToWalletBalanceView = this.navigateToWalletBalanceView.bind(this)
  }

  async navigateToWalletBalanceView() {
    if (this.state.walletAddress) {
      const wallet = {
        address: this.state.walletAddress,
        ico: this.state.walletCrypto,
        crypto: `${this.state.walletCrypto} wallet`,
      }

      const result = await addWallet(wallet)

      if (result === WALLET_ADDED) {
        Actions.wallets({ type: 'replace' })
      } else {
        SnackBar.show('#Wallet already added!#',
          {
            id: this.state.walletAddress,
            tapToClose: true,
            duration: 2300,
            backgroundColor: 'red',
          }
        )
      }
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    // <TextInput
    //   style={styles.walletAddressInput}
    //   onChangeText={(walletAddress) => this.setState({walletAddress})}
    //   value={this.state.walletAddress || this.state.text}
    // />
    return (
      <View style={baseStyles.container}>
        <Text style={baseStyles.title}>#Your  wallet address for...#</Text>
        <Text style={styles.cryptoTitle}>{this.state.walletCrypto}</Text>
        <Kohana
          style={styles.walletAddressInput}
          onChangeText={(walletAddress) => this.setState({ walletAddress })}
          label={'#Scan your address...#'}
          iconClass={FontAwesomeIcon}
          iconName={'credit-card'}
          iconColor={colors.bitcoin}
          inputStyle={{ color: colors.bitcoin }}
          iconSize={20}
          useNativeDriver
          value={this.state.walletAddress}
        />
        <Button
          type="primary"
          disabled={!this.state.walletAddress}
          onPress={this.navigateToWalletBalanceView}
          text="#Add wallet#"
          accessibilityLabel="Add wallet address to starting monitoring"
        />
        <Button
          type="secondary"
          // disabled={!this.state.walletAddress}
          onPress={() => Actions.scanWalletAsQR()}
          text="#Scan QR#"
          accessibilityLabel="Scan wallet address as a QR code"
        />
      </View>
    )
  }
}

AddWallet.propTypes = {
  walletAddress: PropTypes.string,
  walletCrypto: PropTypes.string,
}

AddWallet.defaultProps = {}
