import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { parseCookies } from 'nookies'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import IdsLine from '../components/ids-line'
import '../styles/header.scss'

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const appUrl = publicRuntimeConfig.API_URL

const Header = (props) => { 
    const { token } = parseCookies()
    const loggedIn = !!token

    // props.router.pathname
    const [navOpen, toggleNav] = useState(false)
    useEffect(() => toggleNav(false), [props.router.pathname])

    return (
        <header className={navOpen ? 'open' : ''}>
            <div className="ids-header">
                <div className="title">
                    Indradyumna Swami Vyasa Puja 2019
                </div>
                <div className="bars"><FontAwesomeIcon icon={faBars} onClick={() => toggleNav(!navOpen)}/>
                    {
                        navOpen &&             
                        <div className="links">
                            <div className="header-item"><Link href={`${appUrl}/`}><a>Home</a></Link></div>
                            {/* <div className="header-item"><Link href='/about'><a>About</a></Link></div> */}
                            <div className="header-item"><Link href={`${appUrl}/myoffering`}><a>My Offering</a></Link></div>
                            {/* <div className="header-item"><Link href='/profile'>Profile</Link></div> */}
                            {loggedIn && 
                                <div className="header-item"><Link href={`${appUrl}/logout`}><a>Logout</a></Link></div>
                            }
                            {!loggedIn && 
                                <div className="header-item"><Link href={`${appUrl}/login`}><a>Login</a></Link></div>
                            }
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header)