const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLock mined: " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.originBlock()];
        this.difficulty = 3;
    }

    originBlock() {
        return new Block(0, "08/03/2019", "Selenite Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let seleniteCoin = new BlockChain();
console.log('Mining block 1...');
seleniteCoin.addBlock(new Block(1, "08/04/2019", { amount: 4 }));
console.log('Mining block 2...')
seleniteCoin.addBlock(new Block(2, "12/04/2019", { amount: 10 }));


console.log(JSON.stringify(seleniteCoin, null, 4));