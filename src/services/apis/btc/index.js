import axios from 'axios'

import { USD, EUR, CNY } from 'ellacrypto/src/constants/fiat'


export const fiatEquivalent = async (balance, currency = USD) => {
  const rates = await getExchangeRate()
  return rates[currency] * balance
}

export const getWalletAddressBalance = (address) =>
  axios
    .get(`https://bitaps.com/api/address/${address}`)
    .then(function (response) {
      // console.debug('Received wallet information')
      // console.debug(response.data)

      confirmedBalanceInSatoshis = response.data.confirmed_balance
      pendingBalanceInSatothis = response.data.pending
      confirmedBalanceInBTC = satoshisToBitcoin(confirmedBalanceInSatoshis)
      pendingBalanceInBTC = satoshisToBitcoin(pendingBalanceInSatothis)

      return { confirmedBalanceInBTC, pendingBalanceInBTC }
    })
    .catch(function (error) {
      console.error(error)
      throw error
    })

getExchangeRate = () =>
  axios
    .get('https://bitaps.com/api/ticker/average')
    .then(function (response) {
      // console.debug('Received exchange information')
      // console.debug(response.data)

      return {
        USD: response.data.usd,
        EUR: response.data.eur,
        CNY: response.data.cny,
      }
    })
    .catch(function (error) {
      console.error(error)
      throw error
    })

satoshisToBitcoin = (satoshis) => satoshis / 100000000
