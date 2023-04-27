import React, {useContext, useState} from 'react'
import classnames from 'classnames'
import {menuContext} from './index'
import {MenuItemProps} from '../menuItem'
import {CSSTransition} from 'react-transition-group'
import Icon from "../Icon";

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
            // console.log('进入' + openStatus)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            setOpenStatus(false)
            // console.log('离开' + openStatus)
        }
    } : {};
    const click = mode !== 'horizontal' ? {
        onClick: (e: React.MouseEvent) => {
            e.preventDefault()
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
                <CSSTransition unmountOnExit in={openStatus} timeout={200} classNames="subeMenu-node">
                    <ul className={classes}>
                        {childFilter}
                    </ul>
                </CSSTransition>
            </div>
        )
    }
    const iconClasses = classnames('viking-icon', {'icon-active': mode !== 'vertical', 'viking-clickIcon': openStatus})
    return (
        <li key={index} className={classes} {...mouse} {...click}>
            <div className="submenu-title">{title} <Icon icon='chevron-up' className={iconClasses}
            ></Icon></div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
