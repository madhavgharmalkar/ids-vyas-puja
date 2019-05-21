import fetch from 'isomorphic-unfetch'
import { parseCookies } from 'nookies'
import Router from 'next/router' 

const dev = process.env.NODE_ENV !== 'production';

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const appUrl = publicRuntimeConfig.API_URL

const idsFetch = (context, url, method = 'GET', data) => {
    const { token } = parseCookies(context)
    const baseUrl = appUrl
    
    return fetch(
        `${baseUrl}${url}`, 
        {
            method: method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: method === 'GET' ? null : JSON.stringify(data)
        })
    .then((response) => {
        if (response.status === 401) {
            if (context && context.res) {
                context.res.writeHead(302, {
                    Location: '/indradyumna-swami-vyasa-puja-2019/login'
                })
                context.res.end()
                return {}
            } else {
                Router.push('/indradyumna-swami-vyasa-puja-2019/login')
                return {}
            }
        }
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

export default idsFetch