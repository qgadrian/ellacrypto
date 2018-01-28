import I18n from 'ex-react-native-i18n'


export default function configureI18n() {
  I18n.fallbacks = true

  I18n.translations = {
    en: {
      navbar: {
        changeWallet: 'Wallets',
        addWallet: 'Add wallet',
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
      }
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
