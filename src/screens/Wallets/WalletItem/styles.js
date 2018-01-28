import { StyleSheet } from 'react-native'
import colors from 'ellacrypto/src/constants/colors'


const styles = StyleSheet.create({
  walletItem: {
    minHeight: 80,
    margin: 8,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius:10,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  alias: {
    color: colors.primaryText,
    fontWeight:'bold',
  },
  address: {
    fontStyle: 'italic',
    fontSize: 10,
    color: colors.secondaryText,
  },
  walletInfo: {
    flex: 1.5,
  },
  walletBalance: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icoBalance: {
    fontSize: 12,
    color: colors.primaryText,
  },
  fiatBalance: {
    color: colors.primaryText,
    fontSize: 10,
  },
})

export const loaderStyles =  {
  size: 20,
  color: colors.primaryText,
}

export default styles
