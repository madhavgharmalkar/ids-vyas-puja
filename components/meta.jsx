import Head from 'next/head'
import Header from '../components/header'

export default (props) => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
        </Head>
        <style jsx global>{`
            html {
                height: 100%;
            }
            body {
                margin: 0;
                background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
                background-repeat: no-repeat;
                @import url('https://fonts.googleapis.com/css?family=Karla');

                font-family: 'Karla', sans-serif;
            }
        `}</style>
        <Header userData={props.userData}></Header>
    </div>
)