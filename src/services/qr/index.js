import { BITCOIN, ETHEREUM, IOTA } from 'ellacrypto/src/constants/ico'


// https://github.com/ognus/wallet-address-validator
const walletAddressValidator = require('wallet-address-validator')


export const getWalletFromQR = (qrWalletAddress, walletCrypto) => {
  let parsedWalletAddress
  qrWalletAddress = qrWalletAddress.split("?")[0]
  const splitIndex = qrWalletAddress.indexOf(':')

  if (qrWalletAddress.startsWith('bitcoin:')) {
    parsedWalletAddress = getSplittedWalletAddress(qrWalletAddress, splitIndex)

    isValid = walletAddressValidator.validate(parsedWalletAddress, BITCOIN)

    if (!isValid) {
      console.error(`Invalid BTC address: ${parsedWalletAddress}`)
      return null
    } else {
      return { crypto: BITCOIN, address: parsedWalletAddress }
    }
  } if (qrWalletAddress.startsWith('ethereum:') || qrWalletAddress.startsWith('eth:')) {
    parsedWalletAddress = getSplittedWalletAddress(qrWalletAddress, splitIndex)

    isValid = true // TODO

    return { crypto: ETHEREUM, address: parsedWalletAddress }
  } else if (walletCrypto) {
    return { crypto: walletCrypto, address: qrWalletAddress }
  }

  console.error(`Unknown ico type and default not provided: ${qrWalletAddress}`)

  return null
}

getSplittedWalletAddress = (qrWalletAddress, splitIndex) => qrWalletAddress.substring(splitIndex+1, qrWalletAddress.length)
