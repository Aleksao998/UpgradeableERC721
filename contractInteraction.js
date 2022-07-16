const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const interface = require("./abi.json");
const dotenv = require("dotenv");
dotenv.config();

const provider = new HDWalletProvider(
  "0x4a3a1205239c37f52fa260e4c2878b62de55a8104ac2d012165013922d6c1b9f",
  "http://localhost:10002"
);

/* instance for action call */
const web3 = new Web3(provider);

const options2 = {
  clientConfig: { keepalive: true, keepaliveInterval: 600000 },
  reconnect: { auto: true, delay: 1000, maxAttempts: 10, onTimeout: true },
};

/* instance for event listen */
const newweb3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:10002"),
  options2
);

async function transaction() {
  try {
    
    const contractABI = interface;
    const contractAddress = "0x88fcA7eD4B7902010ECc81CC51dF71ABd95466eC"
    const contractConnection = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    const contract = await new newweb3.eth.Contract(interface, contractAddress);

    const account = "0x30ea4435167Ee91f9f874b5a894F3282A956C3FF";
    console.log("start Minting:", new Date());

    
    await contractConnection.methods
      .mint(account,0)
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
