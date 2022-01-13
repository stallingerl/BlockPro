import { readFile } from 'fs/promises';
import { s } from './p2p/sharedState';


const main = async () => {

let peerIdConf: any
let id
let node
let firstPeer

const settingsTable = JSON.parse(await readFile(new URL('./settings.json', import.meta.url)));

s.options = settingsTable.options

// Start Quiz
console.log('Starting p2p Quiz')

peerIdConf = process.env.PEER;

console.log(peerIdConf)


}