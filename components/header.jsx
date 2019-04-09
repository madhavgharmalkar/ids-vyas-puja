import React from 'react'
import { parseCookies } from 'nookies'

import ActiveLink from '../components/activeLink'

import '../styles/header.scss'

const HeaderItem = (props) => (
    <ActiveLink href={props.href} className='header-item'>
        <div className="wrapper">
            {props.children}
        </div>
    </ActiveLink>
)

const Header = (props) => {
    console.log('header called')
    const { token } = parseCookies()
    const loggedIn = !!token

    const loggedInNav = () => (
        <header>
            <HeaderItem href='/'>Home</HeaderItem>
            <HeaderItem href='/myoffering'>My Offering</HeaderItem>
            <HeaderItem href='/logout'>Logout</HeaderItem>
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