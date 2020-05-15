
import React from 'react'
//import './index.css'
import './music.css'


class Music extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        searchResult : [], // will contain query result data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp

    SearchButton = (query)=>
     {

      fetch("https://api.discogs.com/database/search?q="+query+"&token=MUhBNVMUUBZzPNsZdctKAXXzxZSdKjCytspuFthj")
        .then(
            (response)=> {
                // here full fetch response object
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        this.setState({
                            searchResult:json_response.results,
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })

                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            error:json_response,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below

                });
            }
        )
        }

add=(i)=>{
    console.log(i)
    let data = {
        id:this.state.searchResult[i].id,
        type: this.state.searchResult[i].type,
        title: this.state.searchResult[i].title,
        uri :this.state.searchResult[i].uri,
        master_id:this.state.searchResult[i].master_id,
    }
     // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html

       fetch("http://localhost:3001/insert_into_playlist",{

           method:'POST',
           headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
       .then(
           (response)=> {
               if (response.ok) {
                   response.json().then(json_response => {
                       console.log(json_response)
                       console.log("values inserted")
                   }
                   )
               }else{
                   // handle errors, for example 404
                   response.json().then(json_response => {
                       this.setState({
                           isLoaded: false,
                           error:json_response
                       });
                   })
               }
           },

           (error) => {
               // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
               // or some unlikely networking error occurs, such a DNS lookup failure.
               this.setState({
                   isLoaded: false,
                   error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
               });
           }
       )
}


render() {

    const thead = (
     <thead>
                <tr><th>TITLE</th><th>uri</th><th>COVER_iMAGE</th><th>TYPE</th></tr>
            </thead>
    )
    const menu =(
    <div>
    <input type="text" name="search" id="search" />
 <button type="button" onClick={() => this.SearchButton(document.getElementById("search").value)}>go</button>
</div>

        )



            if(this.state.error)
            {
                return (
                <div className="panel">
                    {menu}
                <b>{this.state.error.message}</b></div>);
            }
            else if(this.state.isLoaded)
            {
                let resultArr=[]
                for(let i=0;i<this.state.searchResult.length-1;i++){
                resultArr.push(
                <tr key={i}>
                <td>{this.state.searchResult[i].title}</td>
                <td><a href={"http://www.discogs.com/"+this.state.searchResult[i].uri} target="_blank"  rel="noopener noreferrer">cilck here</a></td>

                <td><img src={this.state.searchResult[i].cover_image} alt="123"/> </td>
                <td>{this.state.searchResult[i].type}</td>
                <td><button type="button" id="add" value={i} onClick={()=>this.add(i)}>add</button></td>
                </tr>
                )

            }

                    return (
                            <div className="panel">
                                   {menu}
                            <table className="table_css">

                            {thead}
                            <tbody>
                            {resultArr}
                            </tbody>
                            </table>
                            </div>
                    )
            }
                else
                {
                    return(
                    <div >
                        {menu}
                        <b>search </b>
                        </div>
                    )
                }
            }

        }



export default Music;
