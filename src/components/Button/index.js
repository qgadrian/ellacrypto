import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import CutomizableButton from 'apsl-react-native-button'

import styles from './styles'


const Button = props => {
  return (
    <CutomizableButton
      style={[styles[props.type]]}
      disabledStyle={[styles[`${props.type}Disabled`]]}
      isDisabled={props.disabled}
      textStyle={[styles[`${props.type}Text`]]}
      onPress={props.onPress}
      accessibilityLabel="Add bitcoin wallet address to monitor"
    >
      {props.text}
    </CutomizableButton>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string.isRequired,
}

Button.defaultProps = {
  disabled: false,
}

export default Button
