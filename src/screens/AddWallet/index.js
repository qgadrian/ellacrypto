import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { Camera, Permissions } from 'expo'
import { Actions } from "react-native-router-flux"
import { Kohana } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import SnackBar from 'react-native-snackbar-dialog'
import I18n from 'ex-react-native-i18n'
import ModalDropdown from 'react-native-modal-dropdown'

import { WALLETS } from 'ellacrypto/src/constants/storageKeys'
import { WALLET_EXIST, WALLET_ADDED } from 'ellacrypto/src/constants/status'

import styles from './styles'
import { styles as baseStyles } from 'ellacrypto/src/constants/styles'
import { addWallet } from 'ellacrypto/src/services/storage/wallets'
import Button from 'ellacrypto/src/components/Button'
import { colors } from 'ellacrypto/src/constants/styles'
import * as ico from 'ellacrypto/src/constants/ico'


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
        <Text style={baseStyles.title}>{I18n.t('addWallet.title')}</Text>
        {/* <Text style={styles.cryptoTitle}>{this.state.walletCrypto}</Text> */}
        <ModalDropdown
          options={[ico.BITCOIN, ico.ETHEREUM, ico.IOTA]}
          defaultValue="#Scan a code or select the ico#"
          onSelect={walletCrypto => { this.setState({ walletCrypto }) }}
        />
        <Kohana
          style={styles.walletAddressInput}
          onChangeText={(walletAddress) => this.setState({ walletAddress })}
          label={I18n.t('addWallet.input.placeholder')}
          labelStyle={styles.walletAddressInputLabel}
          iconClass={FontAwesomeIcon}
          iconName={'credit-card'}
          iconColor={colors.bitcoin}
          iconSize={10}
          inputStyle={{ color: colors.bitcoin }}
          useNativeDriver
          value={this.state.walletAddress}
        />
        <Button
          type="secondary"
          // disabled={!this.state.walletAddress}
          onPress={() => Actions.scanWalletAsQR()}
          text={I18n.t('addWallet.input.scanQRButton.text')}
          accessibilityLabel={I18n.t('addWallet.input.scanQRButton.accessibility')}
        />
        <Button
          type="primary"
          disabled={!this.state.walletAddress}
          onPress={this.navigateToWalletBalanceView}
          text={I18n.t('addWallet.input.addButton.text')}
          accessibilityLabel={I18n.t('addWallet.input.addButton.accessibility')}
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
