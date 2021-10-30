import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TipIcon from "../svg/tip.png";
import EthIcon from "../svg/ethereum.png";

import getWeb3 from "../getWeb3";
import TipCuratorsContract from "../contracts/Donation.json";

import ReactMarkdown from "react-markdown";
import "./styles.css";

const { ethers } = require("ethers");

export default function SeePost() {
  const post = JSON.parse(localStorage.getItem("ablogs"));
  const [web3State, setWeb3State] = useState(null);

  const [tipAmount, seTipAmount] = useState("0");

  const handleChange = ({ target: { value } }) => {
    seTipAmount(value);
  };

  const handleSubmit = async () => {
    try {
      const accounts = await web3State.eth.getAccounts();
      const networkId = await web3State.eth.net.getId();
      const networkData = TipCuratorsContract.networks[networkId];

      const tipCurators = new web3State.eth.Contract(
        TipCuratorsContract.abi,
        "0xbcf39c8908C6320bd2984a670de07A581ff14c87"
      );

      const price = ethers.utils.parseUnits(tipAmount, "gwei");
      console.log(
        `sending transaction from account ${accounts[0]}, amount:${price} ethers`
      );

      const transaction = await tipCurators.methods.donate(post.author).send({
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

  const duck = string => {
    return `${string.substr(0, 5)}...${string.substr(-5, 5)}`;
  };

  //   console.log("Slug: ", post);
  return (
    <div>
      <div className="container-post">
        <div className="tip-icon-container">
          <img className="tip-img" src={TipIcon} />
          <p>Tip your curator</p>
        </div>

        <div className="tip-container">
          {/* <p>Please tip your curator</p> */}
          <span className="eth-container">
            <p>Ethereum</p>
            <img className="eth-img" src={EthIcon} />
          </span>
          <p
            className="address"
            style={{ cursor: "pointer" }}
            onClick={() =>
              (window.location.href = `https://ropsten.etherscan.io/address/${post.author}`)
            }
          >
            {duck(post.author)}
          </p>
          <p>Enter Donation Amount</p>
          <div className="input-container">
            <input type="text" value={tipAmount} onChange={handleChange} />
            {/* <span>Eth</span> */}
          </div>

          <button onClick={handleSubmit}>Continue</button>
        </div>
      </div>
      <div className="markdown-container">
        <div className="author-container">
          <h3>{post.title}</h3>
          <p className="author">Written By - {post.author}</p>
        </div>
        <ReactMarkdown children={post.body} />
      </div>
    </div>
  );
}
