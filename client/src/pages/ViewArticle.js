import React, { useEffect, useState } from "react";
import getWeb3 from "../getWeb3";
import TipCuratorsContract from "../contracts/Donation.json";

const { ethers } = require("ethers");

function ViewArticle() {
  const [amount, setAmount] = useState(null);
  const [web3State, setWeb3State] = useState(null);
  const [address, setAddress] = useState(null);

  const handleChange = e => {
    setAmount(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const accounts = await web3State.eth.getAccounts();
      const networkId = await web3State.eth.net.getId();
      const networkData = TipCuratorsContract.networks[networkId];
      console.log(networkData.address);

      const tipCurators = new web3State.eth.Contract(
        TipCuratorsContract.abi,
        "0xbcf39c8908C6320bd2984a670de07A581ff14c87"
      );

      const price = ethers.utils.parseUnits(amount, "gwei");

      console.log(address, price);

      const transaction = await tipCurators.methods.donate(address).send({
        from: accounts[0],
        value: price,
      });

      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const setWeb3 = async () => {
      const web3 = await getWeb3();
      setWeb3State(web3);
    };
    setWeb3();
  }, []);
  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  return (
    <div
      style={{ marginTop: "100px", display: "flex", flexDirection: "column" }}
    >
      Amount
      <input value={amount} placeholder="Amount" onChange={handleChange} />
      Address
      <input
        value={address}
        placeholder="Address"
        onChange={handleChangeAddress}
      />
      <button onClick={handleSubmit}>SEND MONEY </button>
    </div>
  );
}

export default ViewArticle;
