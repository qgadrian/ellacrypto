import { StyleSheet } from 'react-native'


export const colors = {
  bitcoin: '#FF9900',
  secondaryText: '#4A4A4A',
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  secondaryText: {
    color: '#9B9B9B',
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 36,
    textAlign: 'center',
  },
  primaryButton: {
    borderColor: '#4A90E2',
    backgroundColor: '#4A90E2',
  },
  primaryButtonDisabled: {
    borderColor: 'rgba(74, 144, 226, 0.54)',
    backgroundColor: 'rgba(74, 144, 226, 0.54)',
  },
  primaryButtonText: {
    color: 'white'
  },
  secondaryButton: {
    borderColor: 'rgb(53,140,225)',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: 'rgb(53,140,225)',
  }
})
