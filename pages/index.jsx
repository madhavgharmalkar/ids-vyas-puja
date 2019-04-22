import React, {Component} from 'react'
import Head from 'next/head'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'

import IdsLine from '../components/ids-line.jsx' 

import idsFetch from '../components/helpers/idsFetch.js'

import '../styles/index.scss'

class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offerings: props.offerings,
            hasMore: props.offerings.length === 10
        }
    }

    static async getInitialProps(ctx) {
        const now = new Date().getTime()

        const [userData, offerings] = await Promise.all([
            idsFetch(ctx, '/api/user/profile'),
            idsFetch(ctx, `/api/offerings?now=${now}`)
        ])

        return {
            userData,
            offerings,
            now
        }
    }

    getOfferings = async () => {
        try {
            const data = await idsFetch({}, `/api/offerings?now=${this.props.now}&offset=${this.state.offerings.length}`)

            if (data.length) {
                this.setState({
                    offering: [...this.state.offerings, ...data]
                })
            } else {
                this.setState({
                    hasMore: false
                })
            }
        } catch(e) {
        }
    }

    render() {
        return (
            <div className="ids-offerings">
                <Head>
                    <title>IDS Vyasa Puja | Welcome</title>
                </Head>
                <h1 className="welcome">{`Welcome ${this.props.userData.name}!`}</h1>
                <IdsLine></IdsLine>
                <div className="feed">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.getOfferings}
                        hasMore={this.state.hasMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {this.state.offerings.map((value, index) => (
                            <div key={index} className="offering">
                                <div className="name">{`${moment.utc(value.createdAt).local().calendar()}, ${value.user.name} wrote`}</div>
                                <div className="offering-text">
                                    {value.offering.split('\n').map((value, index) => (
                                        <p key={index}>{value || <br></br>}</p>
                                    ))}
                                </div>
                                {/* <div className="actions-row">
                                    <div className="action" onClick={() => {this.likePost(value.id, !value.liked)}}>{value.liked ? 'Unlike' : 'Like'}</div>
                                </div> */}
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default Feed