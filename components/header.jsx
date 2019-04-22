import React, { useState } from 'react'

import { parseCookies } from 'nookies'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import ActiveLink from '../components/activeLink'
import IdsLine from '../components/ids-line'

import '../styles/header.scss'

const HeaderItem = (props) => (
    <div className="header-item">
        <ActiveLink href={props.href}>
            {props.children}
        </ActiveLink>
    </div>
)

const Header = (props) => { 
    const { token } = parseCookies()
    const loggedIn = !!token

    const [navOpen, toggleNav] = useState(false)

    const loggedInNav = () => (
        <header className={navOpen ? 'open' : ''}>
            <div className="ids-header">
            <div className="bars"><FontAwesomeIcon icon={faBars} onClick={() => toggleNav(!navOpen)}/></div>
                {
                    navOpen &&             
                    <div className="links">
                        <div onClick={() => toggleNav(false)}><HeaderItem href='/'>Home</HeaderItem></div>
                        <div onClick={() => toggleNav(false)}><HeaderItem href='/myoffering'>My Offering</HeaderItem></div>
                        {/* <div onClick={() => toggleNav(false)}><HeaderItem href='/profile'>Profile</HeaderItem></div> */}
                        <div onClick={() => toggleNav(false)}><HeaderItem href='/logout'>Logout</HeaderItem></div>
                    </div>
                }
            </div>
        </header>
    )

    const loggedOutNav = () => {
        <header>
        </header>     
    }

    return (
        <div>
            {loggedIn ? loggedInNav() : loggedOutNav()}
        </div>
    )
}

export default Header