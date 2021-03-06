import React from 'react'
import App, { Container } from 'next/app'

import Layout from '../components/layout'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        
        return { pageProps }
    }
    
    render () {
        const { Component, pageProps } = this.props
        
        return (
            <Container>
                <Layout {...pageProps}>
                    <Component {...pageProps} />
                </Layout>
            </Container>
            )
        }
    }
    
    export default MyApp