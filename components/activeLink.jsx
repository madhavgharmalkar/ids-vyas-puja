import { withRouter } from 'next/router'
import classnames from 'classnames'

const ActiveLink = ({ children, router, href, className }) => {
    const handleClick = e => {
        e.preventDefault()
        router.push(href)
    }
    
    return (
        <a href={href} onClick={handleClick} className={classnames({
            'active': router.pathname === href,
            [className]: true
        })}>
            {children}
        </a>
    )
}

export default withRouter(ActiveLink)