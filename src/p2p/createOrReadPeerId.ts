import {readFile} from 'fs/promises';
import fs from 'fs'
import path from 'path';
const PeerId = require('peer-id')


const createOrReadPeerId = async (peerIdConf: any) => {

    console.log(__dirname)
    let peerId: any = await readFile(path.join(__dirname, peerIdConf), "utf-8")
    console.log(peerId)

    try {
      // read peerId from local json if available
      peerId = await PeerId.createFromJSON(peerId))
      console.log('Read existing peerId = ', peerId.toJSON().id)
    } catch (error) {
  
      // create new peerId locally if not available
      console.warn(`Couldn't read peer id from ${peerIdConf}. Create new peerId`)
      peerId = await PeerId.create({ bits: 1024, keyType: 'RSA' });
      console.log(JSON.stringify(peerId.toJSON(), null, 2))
      fs.writeFileSync(peerIdConf, JSON.stringify(peerId));
    }
    return peerId

}
export default createOrReadPeerId;