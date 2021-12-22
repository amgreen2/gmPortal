const main = async () => {
    const gmContractFactory = await hre.ethers.getContractFactory('GmPortal');
    const gmContract = await gmContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await gmContract.deployed();
    
    console.log("Contract deployed to:", gmContract.address);
    //get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        gmContract.address
    );
    console.log('Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
      );
    //send gm
    let gmCount = await gmContract.getTotalGms();
    console.log(gmCount.toNumber());
    //get gm txn
    let gmTxn = await gmContract.gm('gm web3 citizen');
    await gmTxn.wait();

    //get gm txn 2
    let gmTxn2 = await gmContract.gm('wagmi');
    await gmTxn2.wait();
    //get balance after gm
    contractBalance = await hre.ethers.provider.getBalance(gmContract.address);
    console.log('contract balance:', hre.ethers.utils.formatEther(contractBalance)
    );//execute getAllGms method
    let allGms = await gmContract.getAllGms();
    console.log(allGms);
};
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();