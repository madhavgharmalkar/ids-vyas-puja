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
    const { token } = parseCookies()
    const loggedIn = !!token

    return (
        <header>
            <HeaderItem href='/'>Home</HeaderItem>
            <HeaderItem href='/myoffering'>My Offering</HeaderItem>
            <HeaderItem href='/login'>{ loggedIn ? 'Logout' : 'Login' }</HeaderItem>
        </header>
    )
}

export default Header