import React from 'react'
import Router from 'next/router'

import {destroyCookie} from 'nookies'


const logout = () => {

}

logout.getInitialProps = (ctx) => {
    destroyCookie(ctx, "token")
    const res = ctx.res

    if (res) {
        res.writeHead(302, {
            Location: '/login'
        })
        res.end()
    } else {
        Router.push('/login')
    }

    return {}
}

export default logout