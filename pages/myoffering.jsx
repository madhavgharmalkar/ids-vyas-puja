import React, {Component} from 'react'
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
            offering: props.offering
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveOffering = this.saveOffering.bind(this)
    }

    handleChange(event) {
        this.setState({offering: event.target.value});
    }

    saveOffering() {
        idsFetch({}, '/api/offerings/myoffering', "POST", {offering: this.state.offering})
    }

    render() {
        return (
            <div className="ids-my-offering">
                <div className="title">Edit your offering</div>
                <div className="offering">
                    <textarea 
                        onChange={this.handleChange}
                        className="offering-text" 
                        name="" 
                        id="" 
                        value={this.state.offering}>
                    </textarea>
                </div>
                <div className="submit" onClick={this.saveOffering}>
                    Save
                </div>
            </div>
        )
    }

}

export default MyOffering