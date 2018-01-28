import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  invalidBtcWalletAddressContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  invalidBtcWalletAddress: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 20,
  },
})

export default styles
