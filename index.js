const bitcoin = require("bitcoinjs-lib")
const bip39 = require("bip39")
console.log("started")
const mnemonicToM = (mnemonic, password, network) => {
    var seed = bip39.mnemonicToSeed(mnemonic, password || "")
    var m = bitcoin.bip32.fromSeed(seed, bitcoin.networks[network || "bitcoin"])
    return m
}

const getAddress = (node) => {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey }).address
}

const mnemonic = bip39.generateMnemonic();
const m = mnemonicToM(mnemonic, '', 'bitcoin')
console.log(mnemonic)
console.log(m.derivePath("m/44'/0'/0'").toBase58())
console.log(m.derivePath("m/44'/0'/0'").neutered().toBase58())
console.log(getAddress(m.derivePath("m/44'/0'/0'/0/0")))
