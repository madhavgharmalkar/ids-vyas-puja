import React, { Component, useState } from 'react'
import Head from 'next/head'

import IdsLine from '../components/ids-line'
import IdsBox from '../components/ids-box'
import IdsButton from '../components/ids-button'


import idsFetch from '../components/helpers/idsFetch';

import '../styles/ids-edit-profile.scss'


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.user
        }
    }

    static async getInitialProps(ctx) {
        try {
            const data = await idsFetch(ctx, '/api/user/profile')
            return {
                user: data
            }
        } catch (e) {
            console.log(e)
    
        }
    }

    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    formSubmit = (e) => {
        e.preventDefault()
        
    }

    render() {
        return (
            <div className="ids-edit-profile">
                <Head>
                    <title>Edit your profile | IDS Vyas Puja</title>
                </Head>
                <h1>Edit profile</h1>
                <IdsLine></IdsLine>
                <form id="profile" onSubmit={e => this.formSubmit(e)} className="profile-form">
                    <IdsBox>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleFormChange(e)}/>

                        <label htmlFor="language">Language:</label>
                        <select id="language" name="language" value={this.state.language} onChange={(e) => this.handleFormChange(e)}>
                            <option value="EN">English</option>
                            <option value="RU">Russian</option>
                        </select>
                    </IdsBox>

                    <button className="ids-submit" type="submit">
                        <IdsButton>Submit</IdsButton>
                    </button>
                </form>
            </div>
        )
        
    }
}

export default EditProfile