import createNode from './p2p/createNode'
import { readFile } from 'fs/promises';
import { s } from './p2p/sharedState';
import transportLocalFile from "./test/transportLocalFile"
import createOrReadPeerId from './p2p/createOrReadPeerId'
import path from 'path';
import peerDiscovery from './p2p/peerDiscovery'
import { network } from './doichainjs-lib/index';
import { createOrReadSeed } from './p2p/createOrReadSeed'

const main = async () => {

    let peerIdConf: any

    const settingsTable = JSON.parse(await readFile(path.join(__dirname, 'settings.json'), 'utf-8'));

    s.options = settingsTable.options

    transportLocalFile(s.options.transportLocalFilePath);

    // Start Quiz
    console.log('Starting p2p Quiz')

    peerIdConf = process.env.PEER;

    s.id = await createOrReadPeerId(peerIdConf)

    s.node = await createNode(s.id)

    await peerDiscovery(s.node)

    s.id = s.id.toB58String()

    s.network = network.DOICHAIN_TESTNET
    global.DEFAULT_NETWORK = network.DOICHAIN_TESTNET

    let o_options

    s.addrType = "p2wpkh"
    switch (s.addrType) {
        case "legacy":
            s.purpose = "m/44"
            break;
        case "p2sh":
            s.purpose = "m/49"
            break;
        case "p2wpkh":
            s.purpose = "m/84"
            break;
    }

    s.coinType = s.network.name == "mainnet" ? 0 : 1

    s.account = 0 

    s.basePath = `${s.purpose}/${s.coinType}/${s.account}`

    await createOrReadSeed(s.id)

    console.log(s.network)

}
main()
