import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import {
  Scene,
  Stack,
  Router,
  ActionConst,
  Lightbox,
  Actions,
} from 'react-native-router-flux'
import I18n from 'ex-react-native-i18n'
import Sentry from 'sentry-expo'
import { SENTRY_DSN } from 'react-native-dotenv'
import {
  setCustomText
} from 'react-native-global-props'

import configureI18n from './src/constants/i18n'
import Wallets from './src/screens/Wallets'
import WalletInfo from './src/screens/WalletInfo'
import AddWallet from './src/screens/AddWallet'
import ScanWalletAsQR from './src/screens/ScanWalletAsQR'
import { WALLETS } from './src/constants/storageKeys'
import styles, { text as textStyle } from './styles'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    Sentry.config(SENTRY_DSN).install()
  }

  componentWillMount = () => {
    I18n.initAsync()
    configureI18n()
    setCustomText(textStyle)
  }

  render = () => (
    <Router
      sceneStyle={styles.main}
      navigationBarStyle={styles.navBar}
      navBarButtonColor={styles.navBarTextStyle}
      // barButtonIconStyle={styles.navBarTextStyle}
      // navBarButtonColor='#003300'
      titleStyle={styles.navBarTitle}
    >
      <Stack key="root">
        <Scene
          type={ActionConst.REPLACE}
          key="wallets"
          component={Wallets}
          title={I18n.t('wallets.navbarTitle')}
          rightTitle={I18n.t('navbar.addWallet')}
          onRight={() => Actions.addWallet()}
        />
        {/* <Scene
          type={ActionConst.REPLACE}
          key="walletInfo"
          component={WalletInfo}
          title={I18n.t('walletInfo.navbarTitle')}
          rightTitle={I18n.t('navbar.changeWallet')}
          onRight={() => Actions.addWallet()}
        /> */}

        <Scene
          key="addWallet"
          component={AddWallet}
          title="#Ella: Bitcoin wallet monitor#"
          // type={ActionConst.REPLACE}
        />

        <Stack key="root" hideNavBar>
          <Scene
            key="scanWalletAsQR"
            component={ScanWalletAsQR}
            title="#Scan wallet QR code#"
          />
        </Stack>
      </Stack>
    </Router>
  )
}
