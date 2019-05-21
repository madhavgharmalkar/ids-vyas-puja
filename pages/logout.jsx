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
            Location: '/indradyumna-swami-vyasa-puja-2019/login'
        })
        res.end()
    } else {
        Router.push('/indradyumna-swami-vyasa-puja-2019/login')
    }

    return {}
}

export default logout