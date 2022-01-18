var Libp2p = require('libp2p')
var TCP = require('libp2p-tcp')
var Mplex = require('libp2p-mplex')
var NOISE = require('libp2p-noise')
var Gossipsub = require('libp2p-gossipsub')
var Libp2p = require('libp2p-bootstrap')
var Bootstrap = require('libp2p-bootstrap')
import bootstrapers from './peerIds/bootstrapers'


const createNode = async (id: any) => {
  const node = await Libp2p.create({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/15000']
    },
    modules: {
      transport: [TCP],
      streamMuxer: [Mplex],
      connEncryption: [NOISE],
      pubsub: Gossipsub,
      peerDiscovery: [Bootstrap]
    },
    config: {
      peerDiscovery: {
        bootstrap: {
          interval: 60e3,
          enabled: true,
          list: bootstrapers
        }
      }
    },
    peerId: id
  })

  return node
}

export default createNode;