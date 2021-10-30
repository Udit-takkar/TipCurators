import React, { useEffect, useState } from "react";
import getWeb3 from "../getWeb3";
import TipCuratorsContract from "../contracts/Donation.json";
import ReactMarkdown from "react-markdown";
import axios from "axios";

// imgs
import MoneyJarImg from "../svg/money-jar.svg";
import PolygonImg from "../svg/polygon.png";
import EthImg from "../svg/eth2.png";

import PostOverview from "../components/PostOverview";
import MoneySend from "../svg/undraw_transfer_money_rywa.svg";

function Home() {
  const [web3State, setWeb3State] = useState(null);
  const [posts, setPosts] = useState([]);

  const loadAllBlogs = async web3 => {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    localStorage.setItem("currentUser", JSON.stringify(accounts[0]));

    const networkData = TipCuratorsContract.networks[networkId];

    const tipCurators = new web3.eth.Contract(
      TipCuratorsContract.abi,
      "0xbcf39c8908C6320bd2984a670de07A581ff14c87"
    );

    const data = await tipCurators.methods.fetchAllPosts().call();

    const items = await Promise.all(
      data?.map(async i => {
        const postURI = i.postURI;
        const meta = await axios.get(postURI);
        console.log(meta);
        let item = {
          title: meta.data.title,
          body: meta.data.body,
          author: i.author,
          id: i.postid,
        };
        return item;
      })
    );
    setPosts(items);
  };

  useEffect(() => {
    const setWeb3 = async () => {
      const web3 = await getWeb3();
      setWeb3State(web3);
      await loadAllBlogs(web3);
    };
    setWeb3();
  }, []);
  return (
    <div>
      <div className="hero-container">
        <div className="hero">
          <p>Get the best curations for all your discovery needs</p>
          <p>Give back to the community & accept donations in crypto</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <img className="polygon-img" src={PolygonImg} alt="React Logo" />
          <h5 style={{marginTop: '-15px'}}>Polygon</h5>
        </div>
        <img className="eth-home-img" src={EthImg} />
      </div>
      <div>
        <div>
          <p className="mt-5" style={{ marginLeft: "70px", width: "60vw"}}>
            <b>Global Feed</b>
            <img style={{width: '50px'}} src={MoneyJarImg} />
            <hr />
          </p>

          {posts?.map(post => {
            return <PostOverview key={post.id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
