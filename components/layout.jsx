import Meta from './meta'
import Header from './header'

import '../styles/layout.scss'

export default (props) => (
    <div>
        <Meta></Meta>
        <Header userData={props.userData}></Header>
        <div className="ids-vyasa-puja">
            {props.children}
        </div>
    </div>
)