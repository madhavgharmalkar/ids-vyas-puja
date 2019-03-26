import React from 'react'
import '../styles/header.scss'

import ActiveLink from '../components/activeLink'

const HeaderItem = (props) => (
    <ActiveLink href={props.href} className='header-item'>
        <div className="wrapper">
            {props.children}
        </div>
    </ActiveLink>
)

const Header = (props) => {
    const loggedIn = !!props.userData

    const loggedInTabs = () => (
        <HeaderItem href='/myoffering'>My Offering</HeaderItem>
    )

    return (
        <header>
            <HeaderItem href='/'>Home</HeaderItem>
            {loggedIn ? loggedInTabs() : ''}
            <HeaderItem href='/login'>{ loggedIn ? 'Logout' : 'Login' }</HeaderItem>
        </header>
    )
}

export default Header