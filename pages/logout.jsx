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
            Location: '/vyasapuja/login'
        })
        res.end()
    } else {
        Router.push('/vyasapuja/login')
    }

    return {}
}

export default logout