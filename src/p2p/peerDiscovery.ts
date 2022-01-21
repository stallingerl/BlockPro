async function peerDiscovery(node: any) {

    // Which peers are discovered?
    node.on('peer:discovery', (peerId: any) => {
        console.log(`discovered peer: ${peerId.toB58String()}`)
    })

    const cache = {}
    /* node.connectionManager.on('peer:connect', (connection: any) => {
        const connectedPeerId = connection.remotePeer.toB58String()
        if (cache[connectedPeerId]) return
        cache[connectedPeerId] = true
        console.log('connection established to:', connectedPeerId)
    })

    node.connectionManager.on('peer:disconnect', (connection: any) => {
        console.log(`peer disconnected: ${connection.remotePeer.toB58String()}`)
    })*/

    await node.start()
    console.log(`peer node started with id: ${node.peerId.toB58String()}`)

    console.log("node multiaddr: " + node.multiaddrs)

    return(node)
}

export default peerDiscovery;