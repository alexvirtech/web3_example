// morethanwallet testnet example
import Web3 from "web3"
import dotenv from "dotenv"
dotenv.config()

const web3 = new Web3("https://net.mtw-testnet.com/")

const showAccounts = async (accounts) => {
    try {
        accounts.map(async (a) => {
            const val = await web3.eth.getBalance(a)
            let am = web3.utils.fromWei(val, "ether")
            console.log(`${a} balance = ${am}`)
        })
    } catch (error) {
        console.error("Error showing accounts:", error)
    }
}

const send = async (pk, from, to, amount) => {
    try {
        // convert amount to Wei
        let am = web3.utils.toWei(amount.toString(), "ether")
        let gLimit = 21000 // typical gas limit for a simple transfer
        let gPrice = await web3.eth.getGasPrice() // get current gas price from the network

        // create transaction object
        var tx = {
            from: from,
            to: to,
            value: am,
            gas: gLimit,
            gasPrice: gPrice,
        }

        // sign transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, pk)

        // send to blockchain for execution
        let t = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        // print transaction hash
        console.log(t.transactionHash)
    } catch (error) {
        console.error("Error sending transaction:", error)
    }
}

const myAddress = "0x3B2169D7C26afD01e01F2f18393259ca7DF66140"
const myPrivateKey = process.env.MY_PRIVATE_KEY
const recepient = "0x033092545fa9D0fD76EB75D5ad1F10C29694ECa8"

const acc = [myAddress, recepient]

const run = async () => {
    await showAccounts(acc)
    console.log("**************** before *******************")
    await send(myPrivateKey, myAddress, recepient, 0.1)
    console.log("**************** after *******************")
    await showAccounts(acc)
}

run()
