import React from 'react'
import './styles/App.css'
import twitterLogo from './assets/twitter-logo.svg'


// CONSTANTS
const TWITTER_HANDLE = 'ConnorDorian4' 
const TWITTER_LINK = 'https://twitter.com/ConnorDorian4'
const OPENSEA_LINK = ''
const TOTAL_MINT_COUNT = 50


const App = () => {

    const renderNotConnectedContainer = () => (
        <button className='cta-button connect-wallet-button'>
            Connect Wallet
        </button>
    )

    return (
        <div className='App'>
            <div className='container'>

                <div className='header-container'>
                    <p className='header gradient-text'>My NFT Collection</p>
                    <p className='sub-text'>Each unique. Each beautiful. Discover your NFT today.</p>
                    {renderNotConnectedContainer()}
                </div>

                <div className='footer-container'>
                    <img className='twitter-logo' alt='Twitter Logo' src={twitterLogo} />
                    <a className='footer-text' href={TWITTER_LINK} target='_blank' rel='noreferrer'>{`built by @${TWITTER_HANDLE}`}</a>
                </div>

            </div>
        </div>
    )

}

export default App