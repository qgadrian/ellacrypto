import I18n from 'ex-react-native-i18n'


export default function configureI18n() {
  I18n.fallbacks = true

  I18n.translations = {
    en: {
      navbar: {
        changeWallet: 'Wallets',
        addWallet: '+',
      },
      wallets: {
        navbarTitle: 'Wallets',
      },
      walletInfo: {
        navbarTitle: 'My wallet',
        title: 'Balance',
        unconfirmedTransactions: 'Pending confirmation',
        refreshButton: 'Refresh',
      },
      crypto: {
        bitcoin: {
          symbol: 'BTC'
        }
      },
      addWallet: {
        title: "Your wallet address for...",
        input: {
          placeholder: "Scan or write your wallet address...",
          addButton: {
            text: "Add wallet",
            accessibility: "Add wallet address to starting monitoring",
          },
          scanQRButton: {
            text: "Scan QR",
            accessibility: "Scan wallet address as a QR code",
          }
        }
      },
    },
    es: {
      walletInfo: {
        navbarTitle: 'Mi cartera',
        title: 'Balance',
        unconfirmedTransactions: 'En transacciones no confirmadas'
      }
    }
  }
}
