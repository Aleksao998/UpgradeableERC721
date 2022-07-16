const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const interface = require("./abi.json");
const dotenv = require("dotenv");
dotenv.config();

const provider = new HDWalletProvider(
  "0x0696323291c852ab9bd625d77b0f5fee8ad8399088eb0af603799988a67d9f8e",
  "https://rpc.testnet.rario.com"
);

/* instance for action call */
const web3 = new Web3(provider);

const options2 = {
  clientConfig: { keepalive: true, keepaliveInterval: 600000 },
  reconnect: { auto: true, delay: 1000, maxAttempts: 10, onTimeout: true },
};

/* instance for event listen */
const newweb3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.testnet.rario.com"),
  options2
);

async function transaction() {
  try {
    console.log("USAOO")

    //deploy contract
    
    
    const contractABI = interface;
    const contractAddress = "0x5BFaB60629f1bf1ff3e04fa8aeb113d77C4D60DA"
    const contractConnection = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    const contract = await new newweb3.eth.Contract(interface, contractAddress);

    const account =  "0x378F09511aF51c0cf314F88E4c911cC2623af485";
    console.log("start Minting:", new Date());

    
    await contractConnection.methods
      .mint(account, 1)
      .send({
        from: account,
        gas: "5242870",
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("error", console.error).then(function(receipt){
        console.log("receipt", receipt)
    });


  } catch (err) {
    console.log("Error", err.message);
  }
}

transaction();
