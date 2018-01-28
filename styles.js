import { StyleSheet } from 'react-native'
import colors from 'ellacrypto/src/constants/colors'


export const text = {
  style: {
    color: 'white'
  }
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.background,
  },
  navBar: {
    backgroundColor: colors.primary,
  },
  navBarTitle: {
    color: colors.primaryText,
  },
  navBarTextStyle: {
    color: colors.primaryText,
  },
})

export default styles
