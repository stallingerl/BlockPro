import {readFile} from 'fs/promises';
import fs from 'fs'
import path from 'path';
const PeerId = require('peer-id')



const createOrReadPeerId = async (peerIdConf: any) => {

    let peerId

    try {
      // read peerId from local json if available
      const peerConfJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, peerIdConf), 'utf-8')) 
      peerId = await PeerId.createFromJSON(peerConfJSON)
      console.log('Read existing peerId = ', peerId.toJSON().id)
    } catch (error) {
      console.log(error)
      // create new peerId locally if not available
      console.warn(`Couldn't read peer id from ${peerIdConf}. Create new peerId`)
      peerId = await PeerId.create({ bits: 1024, keyType: 'RSA' });
      console.log(JSON.stringify(peerId.toJSON(), null, 2))
      fs.writeFileSync(peerIdConf, JSON.stringify(peerId));
    }
    return peerId

}
export default createOrReadPeerId;