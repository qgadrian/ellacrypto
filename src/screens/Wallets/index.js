import React from 'react'
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  AsyncStorage,
} from 'react-native'
import { Circle as Progress } from 'react-native-progress'
import { Actions } from "react-native-router-flux"

import { getWallets } from 'ellacrypto/src/services/storage/wallets'
import styles from './styles'
import { colors } from 'ellacrypto/src/constants/styles'
import WalletItem from './WalletItem'


class Wallets extends React.Component {
  state = {
    loading: false,
  }

  componentWillMount = () => {
    this.readWalletAddressesFromStorage()
  }

  async readWalletAddressesFromStorage() {
    try {
      // AsyncStorage.clear()
      const wallets = await getWallets()

      console.debug(`wallets: ${wallets}`)

      if (wallets !== null) {
        this.setState({ wallets })
      } else {
        Actions.addWallet({ type: 'replace' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  keyExtractor = (item, index) => item.address

  renderItem = ({ item }) => (
    <WalletItem
      ico={item.ico}
      balance={item.balance}
      address={item.address}
      alias={item.alias}
    />
  )

  onRefresh = () => {
    this.forceUpdate()
  }

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text>#Loading wallets...#</Text>
      <Progress indeterminate={true} />
    </View>
  )

  renderWallets = () => (
    <View style={styles.container}>
      <FlatList
        data={this.state.wallets}
        // extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        refreshing={false}
        onRefresh={this.onRefresh}
      />
    </View>
  )

  render = () => this.state.loading ? this.renderLoading() : this.renderWallets()
}

export default Wallets
