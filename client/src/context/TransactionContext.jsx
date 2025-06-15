import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionContract;
  }

  export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsloading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((preState) => ({...preState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask"); //if there no metamask installed

            const accounts = await ethereum.request({ method: 'eth_accounts'});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions(); // to lıst all the transactıons ın our blockchaın
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error(" No ethereum object.");
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error);

            throw new Error(" No ethereum object.");
        }
    }

// To connect the wallet to metamask 
    const connectWallet = async () => {
        try {
            if(!ethereum) return("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts'}); // the user will choose the account that he wants to be connected with

            setCurrentAccount(accounts[0]); // the account that he is already connected with will be selected automatıcally
        } catch (error) {
            console.log(error);

            throw new Error(" No ethereum object.")
        }
    }

    
    const sendTransaction = async () => { // to sed the transaction through the bockchain
        try {
            if(!ethereum) return("Please install metamask");

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // =21000 GWEI  the fees for any trransaction
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword); // hash value of the transaction, to put ıt ın the blockchhain

            setIsloading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait(); // to wait untıl the ransactıon fınıshed
            setIsloading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount(); // to h ave the number of transaction

            setTransactionCount(transactionCount.toNumber());
            
            window.reload()
        } catch (error) {
            console.log(error);

            throw new Error(" No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
  }