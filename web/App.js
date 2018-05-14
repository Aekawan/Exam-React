import React from 'react';
import WhiteFrame from './components/WhiteFrame'
import logo from './logo.svg';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            fetching: false
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }
 
    goLogin(email,password) {
        this.setState({'fetching':true})
        return fetch('http://localhost:3000/api/login',{
           "email":email,
           "password": pasword
         })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
    }

    

    render() {
        // start your code here
        return <WhiteFrame>
                   <div className="container-column">
                   <img src={logo} className="App-logo" alt="logo" />
                   <p>E-mail address</p>
                   <input type="email" name="email" value={this.state.email} onChange={this.handleEmail} placeholder="youremail@examplecom" />
                   <p>Password</p>
                   <input type="password" name="email"  value={this.state.password} onChange={this.handlePassword} placeholder="yourpassword" />
                   <button onClick={() => this.goLogin(this.state.email,this.state.password)}>SIGN IN</button>
                   </div>
                   <div className="container-row">
                      <a>Forgot password ?</a>
                      <a>Create a new account</a>
                   </div>
               </WhiteFrame>;
    }
}

export default App;
