import React, {useContext, useState} from 'react'
import classnames from 'classnames'
import {menuContext} from './index'
import {MenuItemProps} from '../menuItem'

export interface SubMenuProps {
    className?: string,
    index?: string,
    title: string,
    children: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {className, index, title, children} = props
    const {currentIndex, mode, defaultOpenSubMenu} = useContext(menuContext)
    const defaultOpenSubMenuYes = defaultOpenSubMenu as Array<string>
    const initOpenStatus = (mode === 'vertical' && index) ? defaultOpenSubMenuYes.includes(index) : false
    const classes = classnames(className, "menu-item submenu-item", {'is-active': index === currentIndex})
    const [openStatus, setOpenStatus] = useState(initOpenStatus)
    //判断菜单栏状态
    const mouse = mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            setOpenStatus(true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            setOpenStatus(false)
        }
    } : {};
    const click = mode !== 'horizontal' ? {
        onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            console.log(1)
            setOpenStatus(!openStatus)
        }
    } : {}
    const renderChildren = () => {
        const childFilter = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'menu-item') {
                return React.cloneElement(childElement, {index: `${index}-${i}`})
            } else {
                console.error('do not use other element');
            }
        })
        const classes = classnames('viking-submenu', {'viking-submenu-open': openStatus})
        return (
            <div style={{height: '100%'}}>
                <ul className={classes}>
                    {childFilter}
                </ul>
            </div>
        )
    }
    return (
        <li key={index} className={classes} {...mouse} {...click}>
            <div className="submenu-title">{title}</div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
