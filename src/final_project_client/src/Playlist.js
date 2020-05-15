import React from 'react';
import './playlist.css'



class Playlist extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        playlist_data : [], // will contain tracks data array from server
        playlist_count : 0, // how many tracks in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
         componentDidMount() {

    this.get_tracks();

    }

 get_tracks = ()=>
    {
// AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
       fetch('http://localhost:3001/get_all_tracks')
       .then(
           (response)=> {
               // here full fetch response object
               //console.log(response)
               // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
               if (response.ok) {
                   // handle 2xx code success only
                   // get only JSON data returned from server with .json()
                   response.json().then(json_response => {
                       console.log(json_response)
                       this.setState({
                         playlist_data:json_response.db_data, // data received from server
                           playlist_count:json_response.db_data.length, // how many tracks in array
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
                          // error:json_response,
                           error: {message:"Table is empty"}
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

    delete = (id)=>{
        console.log(id)
        //this.setState({re_render:rows});
           fetch("http://localhost:3001/delete_track/"+id,{

               method:'DELETE',
            })
           .then(
               (response)=> {
                   if (response.ok) {
                       response.json().then(json_response => {
                           console.log(json_response)
                           console.log("values deleted")
                           this.componentDidMount()
                           {
                                this.get_tracks();

                           }
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


    // display the track table
    render() {

        const thead = (
            <thead className="header__item">
                       <tr><th>id</th><th>Title</th><th>uri</th></tr>
                   </thead>
           )

        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.playlist_count!==0){
               let rows=[]
                for(let i=0;i<this.state.playlist_data.length;i++){
               rows.push(
                <tr key={i}>
                <td>{this.state.playlist_data[i].id}</td>
                <td>{this.state.playlist_data[i].title}</td>
                <td><a href={"http://www.discogs.com/"+this.state.playlist_data[i].uri} target="_blank" rel="noopener noreferrer">more info</a></td>
                <button type="button" onClick={()=>this.delete(this.state.playlist_data[i].id)}>DEL</button>
                </tr>)
            }

                return (

                    <div className="panel350">
                        <b>List of tarcks from server localhost:3001/get_all_tracks</b>
                        <br />
                        <br />
                        <table>
                            {thead}
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                )
            }else{
                return(<div><b>Track table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
        }
  }


export default Playlist;

