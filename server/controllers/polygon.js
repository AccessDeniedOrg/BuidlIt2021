const Web3 = require('web3')
const GranteStudioContract = require('../contract_abis/contracts/GranteStudio.json')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = process.env.ACCESSDENIED_WALLET_PRIVATE_KEY
const provider = new HDWalletProvider(
    privateKey,
    'https://speedy-nodes-nyc.moralis.io/ec672ce43aae9065e5b9cda3/polygon/mumbai'
)
const web3 = new Web3(provider)

const getContract = async () => {
    const id = await web3.eth.net.getId()
    const deployedNetwork = GranteStudioContract.networks[id]
    return { contract: new web3.eth.Contract(GranteStudioContract.abi, deployedNetwork.address) }

}

const mintNFT = async (metadata, artistWalletAddress) => {
    const { contract } = await getContract()
    await contract.methods.mintFairToken(metadata).send({
        from: '0x66083a2DDA52c60a719c9a2F79850cE986F1e0BA'
    })
    const tokenId = await contract.methods.lastTokenId().call()
    await transferFromNFT("0x66083a2DDA52c60a719c9a2F79850cE986F1e0BA", artistWalletAddress, tokenId)
    console.log(tokenId)
    return ({ tokenIdBlockchain: tokenId })
};

const transferNFT = async (artistWalletAddress, userWalletAddress, tokenId) => {
    await transferFromNFT(artistWalletAddress, userWalletAddress, tokenId)
};

const transferFromNFT = async (from, to, tokenId) => {
    const { contract } = await getContract()
    await contract.methods.transferFairToken(from, to, tokenId).send({
        from: '0x66083a2DDA52c60a719c9a2F79850cE986F1e0BA'
    })
}

const decoupleNFT = async (from, to, tokenId) => {
    const { contract } = await getContract()
    await contract.methods.transferFairTokenExternal(from, to, tokenId).send({
        from: '0x66083a2DDA52c60a719c9a2F79850cE986F1e0BA'
    })
    console.log("Decoupling")
}

module.exports = {
    mintNFT,
    transferNFT,
    decoupleNFT,
};