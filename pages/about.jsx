import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import IdsLine from '../components/ids-line'
import '../styles/about.scss'

const About = () => (
    <div className="ids-about">
        <Head>
            <title>IDS Vyasa Puja | About</title>
        </Head>
        <h1 className="title">About</h1>
        <IdsLine></IdsLine>
        <p>Hare Krishna!</p>
        <p>Please accept my humble obeisances. All glories to Srila Prabhupada! All glories to Guru and Gauranga!</p>
        <p>This is just a simple platform where everyone can post their offerings on the 
            auspicious occasion of his His Holiness' Indradyumna Swami's 70th Vyasa Puja.</p>
        <p>Please <Link href="/login">log in</Link> to view the other offerings and post your own.</p>
        <p>If you have any questions, sugguestions, or ideas - please feel free to <Link href="mailto:gharmalkar.madhav@gmail.com">email me</Link></p>
        <p>Made with <span>❤️</span>️on Gaura Purnima.</p>
    </div>
)

export default About