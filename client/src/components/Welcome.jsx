import React, { useContext } from 'react';
import { SiEthereum, SiLitecoin } from "react-icons/si";
import { BsCursor, BsSim, BsCurrencyBitcoin, BsCurrencyDollar} from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";

import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { shortenAddress } from '../utils/shortenAddress';


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm blue-glassmorphism"
  />
);

const Welcome = () => {
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
    
    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }
    return (
        <div className="flex w-full justify-center items-center  white-glassmorphism ">
            <div className="flex md:flex-row flex-col items-start justify-between mf:p-20 py-12 px-4" >  {/* This ıs for the right side*/}
                <div className="flex flex-1 justify-start  flex-col md:mr-10 " >  
                    <h1 className="text-3xl sm:text-5xl text-black text-gradient py-3">
                    Hoşgeldiniz <br /> On SingoCrypt
                    </h1>
                    
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base ">
                        <b>The easiest & fastest way to send your transactions trought the World Wide Blockchain. </b>
                    </p>
                    <br />
                    {!currentAccount && (   // the button wıll dısapear ıf we are connected
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <BsCursor fontSize={17} color="#fff" />
                            <p className="text-white text-base font-semibold"> Connection To The Blockchain</p>
                            
                        </button>
                    )}

                    <div >
                        
                            <iframe width="100%" height="300" src="https://www.youtube.com/embed/k6L3z81iVI8?controls=0&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;" allowfullscreen></iframe>
                        
                    </div>
                </div> 
                               
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10"> 
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card">    {/* This ıs for the card*/}
                        <div className="flex justify-between flex-col w-full h-full border-white">
                            <div className="flex justify-between items-start">
                                
                                <BsSim fontSize={70} color="#fff" /> 

                                <div className="w-7.5 h-7.5 rounded-full border-2 border-white flex justify-center items-center">
                                    <BsCurrencyDollar fontSize={20} color="#fff" />
                                </div>

                                <div className="w-7.5 h-7.5 rounded-full border-2 border-white flex justify-center items-center">
                                    <BsCurrencyBitcoin fontSize={20} color="#fff" />
                                </div>

                                <div className="w-7.5 h-7.5 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={20} color="#fff" />
                                </div>
                                
                                <div className="w-7.5 h-7.5 rounded-full border-2 border-white flex justify-center items-center">
                                     <SiLitecoin fontSize={20} color="#fff" />
                                </div>
                            </div> 
                            <div>
                                <p className="text-white font-light text-sm "> {shortenAddress(currentAccount )} </p>
                            </div> 
                            <div>
                                <p className="text-white font-semibold text-lg mt-1 "> ...::: Your E-Card :::... </p>
                            </div>    
                        </div>
                    </div>
                                {/* This ıs for the form*/}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism"> 
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <div className="h-[3px] w-full bg-gray-400 my-2" />    {/* Separation lign*/}
                        
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer  blue-glassmorphism"
                            >
                               
                                SEND
                            </button>
                            
                        )}
                    </div>


                </div>

            </div>
        </div>
    );
}

export default Welcome;