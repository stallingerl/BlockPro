import { getPathsOfAddresses, getAddr } from "./getAddress";
import { saveAddress} from "./getOrSaveDerivationPath"


export const getBalanceOfWallet = async (xpub: any, purpose: any, coinType: any, account: any, o_options: any, addrType: any, id: any) => {
    let options = {}
    if (o_options === undefined || o_options.network === undefined)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'network' does not exist on type '{}'.
        options.network = global.DEFAULT_NETWORK
    else options = o_options


    let balance = Number(0)
    let addressesReturned = []

    addressesReturned = await getPathsOfAddresses(options, addrType, purpose, coinType, account,xpub, id)
    let addresses = addressesReturned[0]

    // if all receiving addresses and all change addresses have transactions, create a new address for each type
    let unusedReceivingAddresses = []
    let unusedChangeAddresses = []
    let lastChangeDerivationPath
    let lastReceiveDerivationPath 

    // check if there are still unused receiving or change addresses
    for (let i = 0; i < addresses.length; i++) {
        
        let address = addresses[i]
        let derivationPath = address.derivationPath
        let change = (derivationPath.split("/")[4] == 1)
        if (!change  && address.transactions.length == 0){
            
            unusedReceivingAddresses.push(addresses[i])
        }else if (change && address.transactions.length == 0){
            
            unusedChangeAddresses.push(addresses[i])
        }
        change ? lastChangeDerivationPath = derivationPath : lastReceiveDerivationPath = derivationPath
    }

    // if there are no unused addresses left create new ones
    if (unusedReceivingAddresses.length == 0){
        let previousIndex  = lastReceiveDerivationPath.split("/")[5] 
        var lastIndex = lastReceiveDerivationPath.lastIndexOf('/');
        let newDerivationPath = lastReceiveDerivationPath.substr(0, lastIndex) + "/" + ++previousIndex      
        let newAddress = getAddr(xpub.derivePath(newDerivationPath).publicKey, options, addrType)
        await saveAddress(purpose, newDerivationPath, newAddress, id)
        let address = {}
        
        address["address"] = newAddress       
        address["balance"] = 0       
        address["derivationPath"] = newDerivationPath       
        address["transactions"] = []
        addresses.push(address)

    } else if (unusedChangeAddresses.length == 0){
        let previousIndex  = lastChangeDerivationPath.split("/")[5] 
        var lastIndex = lastChangeDerivationPath.lastIndexOf('/');
        let newDerivationPath = lastChangeDerivationPath.substr(0, lastIndex) + "/" + ++previousIndex      
        let newAddress = getAddr(xpub.derivePath(newDerivationPath).publicKey, options, addrType)
        await saveAddress(purpose, newDerivationPath, newAddress, id)
        let address = {}
        
        address["address"] = newAddress        
        address["balance"] = 0        
        address["derivationPath"] = newDerivationPath   
        address["transactions"] = []
        addresses.push(address)
    }
}