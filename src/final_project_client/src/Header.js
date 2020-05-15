import React from 'react'

class Header extends React.Component{

    render(){
        //using in-line styling
        return(
            <header style={{backgroundColor:"black ",padding:"10px"}}>
            <div>
                <img src="logo3.jpg" alt="somo logo" style={{width:'100px',height:'100px'}}></img>
            </div>
            </header>
        )
    }
}

export default Header;