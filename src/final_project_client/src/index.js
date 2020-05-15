import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './Header' // refers to Header.js
import Footer from './Footer' // refers to Footer.js

import Music from './Music'
import Playlist from './Playlist'


    class Main extends React.Component{
        render()
        {
            return(
                <main>

                    <p>This is the Main component</p>

                </main>
            )
        }
    }


    class Root extends React.Component
    {
        render(){
            return(
                <div>
                    <Header/>
                    <Main />
                    <Playlist />
                    <Music />
                    <Footer />
                </div>
            )
        }
    }

    ReactDOM.render(<Root/>,document.getElementById('root'));

