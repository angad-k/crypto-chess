const Chess = artifacts.require("Chess");

module.exports = function (deployer) {
  deployer.deploy(Chess);
};
