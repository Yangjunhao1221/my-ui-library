import React, { useContext } from 'react'
import classnames from 'classnames'
import { menuContext } from '../menu'
interface MenuItemProps {
    index: number,
    children?: React.ReactNode,
    style?: React.CSSProperties,
    className?: string,
    disabled?: boolean
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props
    const {currentIndex,itemSelect}=useContext(menuContext)
    const classes = classnames("menu-item", className, { 
        "is-disabled": disabled,'is-active':index===currentIndex
    })
    const handler = () => {
        if (itemSelect&&!disabled) {
            itemSelect(index)   
        }
     }
    return (
        <li style={style} className={classes} onClick={handler}>
            {children}
        </li>
    )
}
export default MenuItem