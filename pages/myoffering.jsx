import React, {Component} from 'react'
import Head from 'next/head'

import IdsLine from '../components/ids-line'
import IdsButton from '../components/ids-button'

import idsFetch from '../components/helpers/idsFetch';

import '../styles/myoffering.scss'

class MyOffering extends Component {
    static async getInitialProps(ctx) {
        const {offering} = await idsFetch(ctx, '/api/offerings/myoffering')
        return {
            offering
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            offering: props.offering,
            saveText: 'Save'
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveOffering = this.saveOffering.bind(this)
    }

    handleChange(event) {
        this.setState({offering: event.target.value});
    }

    async saveOffering() {
        this.setState({
            saveText: 'Saving'
        })

        try {
            await idsFetch({}, '/api/offerings/myoffering', "POST", {offering: this.state.offering})
            this.setState({
                saveText: 'Saved'
            })
        } catch (e) {

        }
    }

    render() {
        return (
            <div className="ids-my-offering">
                <Head>
                    <title>Your Offering | IDS Vyasa Puja</title>
                </Head>
                <h1>Edit your offering</h1>
                <IdsLine></IdsLine>
                <div className="offering-container">
                    <div className="offering">
                        <textarea
                            placeholder="Please enter your offering here"
                            onChange={this.handleChange}
                            className="offering-text" 
                            value={this.state.offering}>
                        </textarea>
                    </div>
                </div>
                <div className="submit">
                    <IdsButton onClick={this.saveOffering}>
                        {this.state.saveText}
                    </IdsButton>
                </div>
            </div>
        )
    }

}

export default MyOffering