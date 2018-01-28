import { StyleSheet } from 'react-native'
import colors from 'ellacrypto/src/constants/colors'


const styles = StyleSheet.create({
  primary: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  primaryDisabled: {
    borderColor: colors.primaryDisabled,
    backgroundColor: colors.primaryDisabled,
  },
  primaryText: {
    borderColor: colors.primaryText,
  },
  secondary: {
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  secondaryDisabled: {
    borderColor: colors.secondaryDisabled,
    backgroundColor: colors.secondaryDisabled,
  },
  secondaryText: {
    color: colors.primary,
  }
})

export default styles
