import { readFile } from 'fs/promises';
import { s } from './p2p/sharedState';
import transportLocalFile from "./test/transportLocalFile"
import createOrReadPeerId from './p2p/createOrReadPeerId'


const main = async () => {

let peerIdConf: any
let id
let node
let firstPeer

const settingsTable = JSON.parse(await readFile('./src/settings.json', 'utf-8'));

s.options = settingsTable.options

transportLocalFile(s.options.transportLocalFilePath);

// Start Quiz
console.log('Starting p2p Quiz')

peerIdConf = process.env.PEER;

id = await createOrReadPeerId(peerIdConf)


}
main()