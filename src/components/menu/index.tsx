import React, {createContext, useState} from 'react'
import classnames from 'classnames'
import {MenuItemProps} from '../menuItem'

type selectFn = (index: string) => void
export type modeType = 'vertical' | 'horizontal'

export interface MenuProps {
    style?: React.CSSProperties,
    className?: string,
    mode?: modeType,
    onSelect?: selectFn,
    children?: React.ReactNode,
    defaultIndex?: string,
    defaultOpenSubMenu?: Array<string>
}

interface menuItemProps {
    itemSelect?: selectFn
    currentIndex: string,
    mode?: string,
    defaultOpenSubMenu?: Array<string>
}

const defaultMenuItemProps: menuItemProps = {
    currentIndex: '0',
    itemSelect: () => {
    },
    mode: 'horizontal'

}
export const menuContext = createContext(defaultMenuItemProps)
const Menu: React.FC<MenuProps> = (props) => {
    const {style, defaultIndex, className, mode, onSelect, children, defaultOpenSubMenu} = props
    const [currentIndex, setCurrentIndex] = useState(defaultIndex)//active状态值
    const defaultItemProps: menuItemProps = {
        currentIndex: currentIndex || '0',
        mode,
        itemSelect: (index: string) => {
            setCurrentIndex(index)
            if (onSelect) {
                onSelect(index)
            }
        },
        defaultOpenSubMenu
    }
    const renderChildren = () => {
        //此方法判断是否为menuItem组件，且依次返回子组件在父组件中的索引
        return React.Children.map(children, (child, index) => {

            const ch = child as React.FunctionComponentElement<MenuItemProps>
            // console.log(ch.type.displayName)
            if (ch.type.displayName === 'menu-item' || ch.type.displayName === 'SubMenu') {//是否为menuItem组件
                return React.cloneElement(ch, {index: index + ''})//给children新增index属性
            } else {
                console.error('do not use other element');
            }

        })
    }

    const classes = classnames("viking-menu", className, {
        "menu-vertical": mode === "vertical", // 竖-菜单(默认横)
        "menu-horizontal": mode !== "vertical",
    })

    return (
        <ul style={style} className={classes} data-testid="test-menu">
            <menuContext.Provider value={defaultItemProps}>
                {renderChildren()}
            </menuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '0',
    defaultOpenSubMenu: []
}
export default Menu
