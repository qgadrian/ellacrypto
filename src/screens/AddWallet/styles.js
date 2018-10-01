import { StyleSheet } from 'react-native'
import colors from 'ellacrypto/src/constants/colors'


const styles = StyleSheet.create({
  walletAddressInput: {
    flex: 0.25,
    backgroundColor: 'transparent',
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.5,
    marginBottom: 25,
  },
  walletAddressInputLabel: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
  },
  addWalletButton: {
    marginTop: 20,
  },
  cryptoTitle: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 20,
    textAlign: 'center',
  },
})

export default styles
