import * as fs from 'fs';
import * as path from 'path';
import { s } from './p2p/sharedState';


const main = async () => {

let peerIdConf: any
let id
let node
let firstPeer

let settingsTable: any 

let pa = path.join(__dirname, './settings.json')
console.log("path: ", pa)

fs.readFile(path.join(__dirname, './src/settings.json'), 'utf-8', (error, data) => {
   settingsTable = data
   console.log(data)
   console.group("hleo")
   console.log(error)
})

s.options = settingsTable.options
console.log(s.options)

// Start Quiz
console.log('Starting p2p Quiz')

peerIdConf = process.env.PEER;

console.log(peerIdConf)


}