import React, { Component } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'

import IdsLine from '../components/ids-line.jsx'

import '../styles/login.scss'

class Login extends Component {
    constructor(props) {
        super(props)

        this.redirectToFBLogin = this.redirectToFBLogin.bind(this)
    }

    redirectToFBLogin() {
        console.log('login with fb called')
        Router.push('/api/login/facebook')
    }

    render() {
        return (
            <div className="ids-login">
                <Head>
                    <title>IDS Vyas Puja | Login</title>
                </Head>
                <h1>Login</h1>
                <IdsLine></IdsLine>
                <div className="social-login" onClick={this.redirectToFBLogin}>
                    <div className="social-login-box">
                        <FontAwesomeIcon className="social-icon" icon={faFacebookF}/>
                        <div>Sign in with Facebook</div>
                    </div>
                </div>

                <div className="social-login" onClick={this.redirectToFBLogin}>
                    <div className="social-login-box">
                        <FontAwesomeIcon className="social-icon" icon={faGoogle}/>
                        <div>Sign in with Google</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login