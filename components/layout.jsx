import Meta from './meta'

import '../styles/layout.scss'

export default (props) => (
    <div>
        <Meta userData={props.userData}></Meta>
        <div className="ids-vyas-puja">
            {props.children}
        </div>
    </div>
)