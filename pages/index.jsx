import React, {Component} from 'react'
import moment from 'moment'

import IdsLine from '../components/ids-line.jsx' 

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
                <h1 className="welcome">{`Welcome ${this.props.userData.name}!`}</h1>
                <IdsLine></IdsLine>
                <div className="feed">
                    {this.state.offerings.map((value, index) => (
                        <div key={value.offering_id} className="offering">
                            <div className="name">{`${moment.utc(value.created_at).local().calendar()}, ${value.name} wrote`}</div>
                            <div className="offering-text">
                                {value.offering.split('\n').map((value, index) => (
                                    <p key={index}>{value || <br></br>}</p>
                                ))}
                            </div>
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