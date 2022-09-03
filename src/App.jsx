import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MyNFT from './utils/MyNFT.json'
import LinkedInLogo from './assets/linkedin-logo.png'
import './styles/App.css'
import Loader from './Loader'

// CONSTANTS
const LINKEDIN_LINK = 'https://www.linkedin.com/in/salik-jamal/'
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-ya8w7uacqt'
const TOTAL_MINT_COUNT = 50
const RINKEBY_CHAINID = '0x4'
    

const App = () => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [nftsminted, setNftsMinted] = useState(0)
    const [currentChainId, setCurrentChainId] = useState('')
    const [loading, setLoading] = useState(true)
    const [nftUrl, setNftUrl] = useState('')

    const { ethereum } = window

    const checkIfWalletIsConnected = async () => {

        if(!ethereum) {
            alert('Make sure you have metamask!')
            return
        }

        ethereum.on('chainChanged', chainId => {
            setCurrentChainId(chainId)
            window.location.reload()
        })

        const accounts = await ethereum.request({ method: 'eth_accounts' })
        const chainId = await ethereum.request({ method: 'eth_chainId'})
        setCurrentChainId(chainId)

        if(accounts.length !== 0) {

            const account = accounts[0]
            setCurrentAccount(account)
          
            setupEventListener()

        } else {
            console.log("No authorized account found")
        }

    }

    

    const connectWallet = async () => {

        try {

            if(!ethereum) {
                alert('Make sure you have metamask!')
                return
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setCurrentAccount(accounts[0])

            setupEventListener() 

        } catch(err) {
            console.log(err)
        }

    }

    const getNFtsCounts = async () => {

        try {

            if(ethereum) {
                
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MyNFT.abi, signer)

                let nftCount = await contract.getTotalNFTsMinted()
                setNftsMinted(nftCount.toNumber())

            }

        } catch(err) {
            console.log(err)
        }

        setLoading(false)

    }

    const renderNotConnectedContainer = () => (
        <button className='cta-button connect-wallet-button' onClick={connectWallet}>
            Connect Wallet
        </button>
    )

    const renderMintButton = () => {
        if(loading) {
            return ( 
                <div className='loader-container'><Loader /></div> 
            )
        } else {
            return (
                <button className='cta-button connect-wallet-button' onClick={mintNFT}>
                    Mint NFT
                </button>
            )
        }
    }

    const renderLoading = () => (
        <div className='loader-container' style={{ margin: 'auto auto' }}>
            <Loader />
        </div>
    )

    const setupEventListener = async () => {

        try {

            if(ethereum) {

                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MyNFT.abi, signer)

                contract.on('NFTMinted', (from, tokenId) => {
                    setNftUrl(`https://testnets.opensea.io/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
                })

            } else {
                console.log('Ethereum object doesn\'t exist')
            }


        } catch(err) {
            console.log(err)
        }

    }

    const mintNFT = async () => {

        if(currentChainId !== RINKEBY_CHAINID) {
            alert("Please switch to Rinkeby Test Network")
            return
        }

        try {

            if(ethereum) {

                setLoading(true)

                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MyNFT.abi, signer)

                let nftTxn = await contract.mintToken()
                await nftTxn.wait()

                await getNFtsCounts()

            } else {
                console.log('Ethereum object doesn\'t exist')
            }

        } catch(err) {
            console.log(err)
        }

        setLoading(false)

    }

    useEffect(() => {
        checkIfWalletIsConnected()
        getNFtsCounts()
    }, [nftsminted, currentAccount])

    return (
        <div className='App'>
            <div className='container'>

                <div className='header-container'>
                    <p className='header gradient-text'>NFTs Minted: {`${nftsminted}/${TOTAL_MINT_COUNT}`}</p>
                    <p className='sub-text'>Each unique. Each beautiful. Discover your NFT today.</p>
                    <a className='opensea-link' href={OPENSEA_LINK} rel='noreferrer' target='_blank'>
                        <button className='cta-button connect-wallet-button'>🌊 View Collection on OpenSea</button>
                    </a>
                    {loading ? renderLoading() : (currentAccount === '' ? renderNotConnectedContainer() : renderMintButton())}
                    {nftUrl !== '' && 
                        <div style={{ marginTop: 50, fontSize: '1em', color: '#FFF' }}>
                            <p>Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take upto 10 min to show up on OpenSea. Here's the link: </p>
                            <a className='gradient-text' style={{ color: "#FFF", fontSize: '1.25em', fontWeight: 'bold', textDecoration: 'none' }} href={nftUrl} target='_blank' rel='noreferrer'>{nftUrl}</a>
                        </div>
                    }
                </div>
                
                

                <div className='footer-container'>
                    <img className='linkedin-logo' alt='LinkedIn Logo' src={LinkedInLogo} />
                    <a className='footer-text' href={LINKEDIN_LINK} target='_blank' rel='noreferrer'>Built By Salik Jamal</a>
                </div>

            </div>
        </div>
    )

}

export default App