import React, { useContext } from 'react'
import classnames from 'classnames'
import { menuContext } from '../menu'
export interface MenuItemProps {
    index?: number,
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
        if (itemSelect&&!disabled&&typeof index==='number') {
            itemSelect(index)   
        }
     }
    return (
        <li style={style} className={classes} onClick={handler}>
            {children}
        </li>
    )
}
MenuItem.displayName='menu-item'//给组件添加测试名称
export default MenuItem