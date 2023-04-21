import React, {useContext} from 'react'
import classnames from 'classnames'
import {menuContext} from './index'
import {MenuItemProps} from '../menuItem'

export interface SubMenuProps {
    className?: string,
    index?: number,
    title: string,
    children: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {currentIndex} = useContext(menuContext)
    const {className, index, title, children} = props
    const classes = classnames("menu-item submenu-item", {'is-active': index === currentIndex})
    const renderChildren = () => {
        const childFilter = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'menu-item') {
                return child
            } else {
                console.error('do not use other element');
            }
        })
        return (
            <ul className="viking-submenu">
                {childFilter}
            </ul>
        )
    }

    return (
        <li>
            <div className="submenu-title">{title}</div>
            {renderChildren()}
        </li>

    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
