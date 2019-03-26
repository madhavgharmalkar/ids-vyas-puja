import React, { Component } from 'react'
import Router from 'next/router'

import { setCookie, destroyCookie } from 'nookies'

import idsFetch from '../components/helpers/idsFetch.js';

import '../styles/login.scss'

class Login extends Component {
    constructor(props) {
        super(props)

        destroyCookie({}, 'token')

        this.state = {
            email: '',
            password: ''
        }
        
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.loginUser = this.loginUser.bind(this)
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    loginUser() {
        idsFetch(null, '/api/login', 'POST', {
            email: this.state.email,
            password: this.state.password
        }).then(data => {
            setCookie({}, 'token', data.token)
            Router.push('/')
        })

    }

    render() {
        return (
            <div className="ids-login">
                <div className="login-container">
                    <div className="label">Login</div>
        
                    <form className="login-form">
                        <div className="login-form-group">
                            <label>Email</label>
                            <input autocomplete="username" onChange={this.handleEmailChange} type="text"/>
                        </div>
                        <div className="login-form-group">
                            <label>Password</label>
                            <input autocomplete="current-password" onChange={this.handlePasswordChange} type="password"/>
                        </div>

                        <div className="login-btn" onClick={this.loginUser}>
                            Login
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login