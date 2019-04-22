import React from 'react'
import '../styles/ids-box.scss'

const IdsBox = (props) => (
    <div className="ids-box">
        <div className="ids-box-content">
            {props.children}
        </div>
    </div>
)

export default IdsBox