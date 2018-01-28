import axios from 'axios'

import { USD, EUR, CNY } from 'ellacrypto/src/constants/fiat'


export const fiatEquivalent = async (balance, currency = USD) => {
  const rates = await getExchangeRate()
  return rates[currency] * balance
}

toEther = (ether) => {
  return ether / 1000000000000000000
}

export const getWalletAddressBalance = (address) =>
  axios
    .get(`https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`)
    .then(function (response) {
      console.debug('Received wallet information')
      console.debug(response.data)

      confirmedBalance = toEther(response.data.balance)
      pendingBalance = toEther(response.data.unconfirmed_balance)

      return { confirmedBalance, pendingBalance }
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
