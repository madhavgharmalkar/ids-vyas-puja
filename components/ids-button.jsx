import React from 'react'

import '../styles/ids-button.scss'

const IdsButton = (props) => (
    <div 
        className="ids-button" 
        onClick={() => {
            if(props.onClick) props.onClick()
        }}
    >
        <div className="ids-button-inside">
            {props.children}
        </div>
    </div>
)

export default IdsButton