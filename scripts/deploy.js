const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBal = await deployer.getBalance();
    const gmContractFactory = await hre.ethers.getContractFactory('GmPortal');
    const gmContract = await gmContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.005'),
    });
    let contractBalance = await hre.ethers.provider.getBalance(
        gmContract.address
    );

    console.log('Deploying contracts with acc: ', deployer.address);
    console.log('Account balance: ', accountBal.toString());

    const Token = await hre.ethers.getContractFactory('GmPortal');
    const portal = await Token.deploy();
    await portal.deployed();

    await gmContract.deployed();
    console.log('GmPortal address: ', portal.address);
    console.log('contract balance:', hre.ethers.utils.formatEther(contractBalance));

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();