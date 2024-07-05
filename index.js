// ganache example
import Web3 from "web3"
const web3 = new Web3("http://127.0.0.1:8545/")

const showAccounts = async () => {
    try {
        let accounts = await web3.eth.getAccounts()
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

const run = async () => {
    await showAccounts()
    console.log("**************** before *******************")
    await send(myPrivateKey, myAddress, recepient, 20)
    console.log("**************** after *******************")
    await showAccounts()
}

const myPrivateKey = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
const myAddress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
const recepient = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"

run()
