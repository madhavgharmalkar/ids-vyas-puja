import React, {Component} from 'react'
import moment from 'moment'

import Header from '../components/header'
import idsFetch from '../components/helpers/idsFetch.js';

import '../styles/index.scss'

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            offerings: props.offerings
        }

        this.likePost = this.likePost.bind(this)
    }

    static async getInitialProps(ctx) {
        const [userData, offerings] = await Promise.all([
            idsFetch(ctx, '/api/user/profile'),
            idsFetch(ctx, '/api/offerings')
        ])

        return {
            userData,
            offerings
        }
    }

    likePost(offeringId, like) {
        idsFetch({}, '/api/offerings/like', "POST", {
            offeringId,
            like
        })
        .then((res) => {
            const { offerings } = this.state
            const offeringIndex = offerings.findIndex(value => value.offering_id === offeringId)
            offerings[offeringIndex].liked = like

            this.setState({
                offerings
            })
        })
    }

    render() {
        return (
            <div className="ids-offerings">
                <div className="welcome">{`Welcome ${this.props.userData.name}!`}</div>
                <div className="feed">
                    {this.state.offerings.map((value, index) => (
                        <div key={value.offering_id} className="offering">
                            <div className="name">{`${moment.utc(value.createdat).local().calendar()}, ${value.name} wrote`}</div>
                            <div className="offering-text">{value.offering}</div>
                            <div className="actions-row">
                                <div className="action" onClick={() => {this.likePost(value.offering_id, !value.liked)}}>{value.liked ? 'Unlike' : 'Like'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}


export default Feed