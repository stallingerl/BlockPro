import { readFile } from 'fs/promises';
import * as path from 'path';
import { s } from './p2p/sharedState';


const main = async () => {

let peerIdConf: any
let id
let node
let firstPeer

const settingsTable = JSON.parse(await readFile('./src/settings.json', 'utf-8'));

s.options = settingsTable.options
console.log("settingsTable", settingsTable)

// Start Quiz
console.log('Starting p2p Quiz')

peerIdConf = process.env.PEER;

console.log(peerIdConf)


}
main()