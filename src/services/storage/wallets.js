import { AsyncStorage } from 'react-native'
import { WALLETS } from 'ellacrypto/src/constants/storageKeys'
import { WALLET_EXIST, WALLET_ADDED } from 'ellacrypto/src/constants/status'


export const addWallet = async (wallet) => {
  let wallets = await AsyncStorage.getItem(WALLETS)
  wallets = JSON.parse(wallets)

  if (wallets === null || wallets === []) {
    wallets = JSON.stringify([wallet])
    try {
      await AsyncStorage.setItem(WALLETS, wallets)
      return WALLET_ADDED
    } catch (error) {
      console.error(error)
      return WALLET_ADD_ERROR
    }
  } else {
    const walletAlreadyStored = wallets.filter(storedWallet => storedWallet.address === wallet.address).length > 0

    if (walletAlreadyStored) {
      return WALLET_EXIST
    } else {
      wallets.push(wallet)
      wallets = JSON.stringify(wallets)
      try {
        await AsyncStorage.setItem(WALLETS, wallets)
        return WALLET_ADDED
      } catch (error) {
        console.error(error)
        return WALLET_ADD_ERROR
      }
    }
  }
}

export const getWallets = async () => {
  const wallets = await AsyncStorage.getItem(WALLETS)
  return JSON.parse(wallets)
}
