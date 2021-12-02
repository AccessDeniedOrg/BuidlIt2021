import { sha3_256 } from 'js-sha3';

class WalletGenerator {

    generateWalletAddress(email) {
        const hexHash = sha3_256(email)
        const ethereumAddress = "0x" + hexHash.slice(hexHash.length - 40)
        return ethereumAddress;
    }

}

export default new WalletGenerator()