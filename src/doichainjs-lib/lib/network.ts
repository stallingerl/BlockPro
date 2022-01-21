import settings from './settings'
const ElectrumClient = require("@codewarriorr/electrum-client-js")

export const DOICHAIN = {
    name: 'mainnet',
    messagePrefix: '\x19Doichain Signed Message:\n',
    bech32: 'dc',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
    },
    pubKeyHash: 52, //D=30 d=90 (52=M) https://en.bitcoin.it/wiki/List_of_address_prefixes
    scriptHash: 13,
    wif: 180, //???
};

export const DOICHAIN_TESTNET = {
    name: 'testnet',
    messagePrefix: '\x19Doichain-Testnet Signed Message:\n',
    bech32: 'td',
    bip32: {
        public: 0x043587CF,
        private: 0x04358394
    },
    pubKeyHash: 111, //D=30 d=90 (52=N) (111=m/n) https://en.bitcoin.it/wiki/List_of_address_prefixes
    scriptHash: 196,
    wif: 239, //???
};

export const DOICHAIN_REGTEST = {
    name: "regtest",
    messagePrefix: "\x19Doichain-Regtest Signed Message:\n",
    bech32: "ncrt",
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
};


export const getElectrumClient = (setSettings = []) => {
    settings.setSettings(setSettings)

    return new ElectrumClient(
        settings.electrumHost,
        settings.electrumPort,
        settings.electrumSSL
    )
}