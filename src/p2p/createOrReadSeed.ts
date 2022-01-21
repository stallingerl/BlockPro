import { resolve } from "path";
var fs = require('fs');
import { createHdKeyFromMnemonic, encryptAES, decryptAES, generateMnemonic } from '../doichainjs-lib/index';
import { s } from "./sharedState";

s.password = "mnemonic"

export async function createOrReadSeed(id: any) {
    return new Promise<void>((res, rej) => {
        let filename = `${__dirname}/encryptedS${id}.txt`
        try {
            if (fs.existsSync(filename)) {
                console.log("Seed phrase exists")
                fs.readFile(filename, 'utf8', async function (err: any, data: any) {
                    s.seed = decryptAES(data, s.password)
                    // generate hd key 
                    s.hdkey = createHdKeyFromMnemonic(s.seed, s.password)
                    console.log("Read Existing Seed from storage");
                    res()
                });
            }else{
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'err'.
                throw err
            }
        } catch (err) {
            console.log("No Seed yet. Creating new one")

            s.seed = generateMnemonic();

            // generate hd key and encrypt with password
            s.hdkey = createHdKeyFromMnemonic(s.seed, s.password)
            const encryptedS = encryptAES(s.seed, s.password)

            // save in local file 

            fs.writeFile(filename, `${encryptedS}`, function (err: any) {
                if (err) throw err;
                console.log('Saved new encrypted seed phrase!');
                res()
            });
        }
    });
}