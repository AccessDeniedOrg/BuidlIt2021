import { sha3_256 } from 'js-sha3';
const { fromHex } = require("tron-format-address");

class WalletGenerator {

    generateWalletAddress(email) {
        const hexHash = sha3_256(email)
        const ethereumAddress = "0x" + hexHash.slice(hexHash.length - 40)
        return fromHex(ethereumAddress);
    }

}

export default new WalletGenerator()