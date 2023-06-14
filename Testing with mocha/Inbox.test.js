// contract test code will go here
const ganache = require("ganache"); 
const assert = require("assert"); 
const mocha = require("mocha");
const {Web3} = require("web3"); 

const web3 = new Web3(ganache.provider());

class Test{
    testFun(){
        return "testText"; 
    }

    testFun2(){
        return "wrongcasingtext"; 
    }
}

// used to add common statements.. that are used in multiple assertions.
let test; 
beforeEach(() => {
    test = new Test(); 
})
// it is used for run a test and make assertions

// describe groups these it's together

describe("Learn About Mocha using the Test class", () => {
    it("Test the testFun function", () => {
        assert.equal(test.testFun(), "testText"); 
    })

    it("testFun2 function should written a camelCase text", () => {
        assert.equal(test.testFun2(), "wrongCasingText"); 
    })
}); 