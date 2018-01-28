import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Image,
  Picker,
  Button,
  ScrollView,
  Vibration,
} from 'react-native'
import { Actions } from "react-native-router-flux"
import { ConfirmDialog } from 'react-native-simple-dialogs'

import styles from './styles'

import { getWalletFromQR } from 'ellacrypto/src/services/qr'


export default class ScanWalletAsQR extends React.Component {
  state = {
    flash: 'off',
    autoFocus: 'on',
    type: 'back',
    barCodeTypes: [Camera.Constants.BarCodeType.qr],
    hasCameraPermission: false,
    showInvalidAddress: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  validateWalletAddress = (qrWalletAddress) => {
    const walletAddress = getWalletFromQR(qrWalletAddress)

    if (walletAddress) {
      Actions.addWallet({ walletAddress: walletAddress.address, walletCrypto: walletAddress.crypto })
      // Actions.popTo('addWallet', { btcWalletAddress: parsedBtcWalletAddress });
    } else {
      this.setState({ showInvalidAddress: true })
    }
  }

  renderInvalidQRMessage() {
    if (this.state.showInvalidAddress) {
      // return (
      //   <View style={styles.invalidBtcWalletAddressContainer}>
      //     <Text style={styles.invalidBtcWalletAddress}>#Unrecognized wallet address#</Text>
      //   </View>
      // )
      return (
        <ConfirmDialog
          visible={this.state.showInvalidAddress}
          title="#Invalid QR code#"
          onTouchOutside={() => this.setState({ showInvalidAddress: false })}
          positiveButton={{
            title: "#Ok#",
            onPress: () => { this.setState({ showInvalidAddress: false }) }
          }}
        />
      )
    }
  }

  processQrCode = ({ data: qrCode }) => {
    // debounce(1000, this.validateWalletAddress(qrCode))
    if (!this.state.showInvalidAddress) {
      this.validateWalletAddress(qrCode)
    }
  }

  renderCamera() {
    if (!this.state.hasCameraPermission) {
      return null
    }

    return (
      <Camera
        ref={ref => {
          this.camera = ref
        }}
        style={{
          flex: 1,
        }}
        flashMode={this.state.flash}
        type={this.state.type}
        autoFocus={this.state.autoFocus}
        barCodeTypes={this.state.barCodeTypes}
        // onBarCodeRead={({ data: qrCode }) => this.validateWalletAddress(qrCode)}
        onBarCodeRead={this.processQrCode}
        focusDepth={this.state.depth}
      >
        {this.renderInvalidQRMessage()}
      </Camera>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'ivory',
//   },
//   invalidBtcWalletAddressContainer: {
//     flex: 0.5,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//   },
//   invalidBtcWalletAddress: {
//     flex: 1,
//     color: 'red',
//     textAlign: 'center',
//   },
// })
