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
                @import url('https://fonts.googleapis.com/css?family=Karla');
                font-family: 'Karla', sans-serif;
            }

            body {
                margin: 0;
                background-color: #f5f6fa;
                color: #2f3640;
            }
        `}</style>
        <Header userData={props.userData}></Header>
    </div>
)