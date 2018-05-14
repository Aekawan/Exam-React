import React from 'react'
import WhiteFrame from './components/WhiteFrame'
import logo from './logo.svg'
import Container from './components/Container'
import TextInput from './components/TextInput'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            fetching: false,
            error: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        this.setState({ fetching: true, error: false })
        event.preventDefault();
        try {
            let data = await this.goLogin(this.state.email, this.state.password)
            if (data.status >= 400) {
                this.setState({ error: true, fetching: false })
            } else if (data.status == 200) {
                this.setState({ email: null, password: null, error: false, fetching: false })
                alert("Login Successed")
            }
        } catch (error) {
            console.log(error)
            this.setState({ error: true, fetching: false })
        }
    }

    goLogin(email = this.state.email, password = this.state.password) {
        this.setState({ 'fetching': true })
        let body = { "email": email, "password": password }

        return fetch('http://localhost:3000/api/login', {
            body: JSON.stringify(body),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        // start your code here
        return <Container>
            <WhiteFrame>
                <img src={logo} className={this.state.fetching === true ? "logo-spin" : "logo"} alt="logo" />
                <form onSubmit={this.handleSubmit}>
                    <TextInput label={"E-mail addres"} name={"email"} type={"email"} placeholder="youremail@exmple.com" onChange={this.handleInputChange} />
                    <br />
                    <TextInput label={"Password"} name={"password"} type={"password"} placeholder="yourpassword" onChange={this.handleInputChange} />
                    <p style={{ color: "red", padding: 0, margin: 0 }}>{this.state.error == true ? "E-mail or password is incorrect" : null}</p>
                    <button>SIGN IN</button>
                </form>
                <div>
                    <a className="alignleft">Forgot password ?</a>
                    <a className="alignright">Create a new account</a>
                </div>
            </WhiteFrame>
        </Container>;

    }
}

export default App
