import fetch from 'isomorphic-unfetch'
import { parseCookies } from 'nookies'
import Router from 'next/router' 

const dev = process.env.NODE_ENV !== 'production';

const idsFetch = (context, url, method = 'GET', data) => {
    const { token } = parseCookies(context)
    const baseUrl = dev ? 'http://localhost:3000' : 'https://ids-vyas-puja.herokuapp.com'

    
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
                    Location: '/login'
                })
                context.res.end()
                return
            } else {
                Router.push('/login')
                return
            }
        }
        return response.json()
    })
    .catch((err) => {
        console.log(err)
    })
}

export default idsFetch