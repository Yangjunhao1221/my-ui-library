import React, {createContext, useState} from 'react'
import classnames from 'classnames'
import {MenuItemProps} from '../menuItem'

type selectFn = (index: number) => void
export type modeType = 'vertical' | 'horizontal'

export interface MenuProps {
    style?: React.CSSProperties,
    className?: string,
    mode?: modeType,
    onSelect?: selectFn,
    children?: React.ReactNode,
    defaultIndex?: number
}

interface menuItemProps {
    itemSelect?: selectFn
    currentIndex: number
}

const defaultMenuItemProps: menuItemProps = {
    currentIndex: 0,
    itemSelect: () => {
    }
}
export const menuContext = createContext(defaultMenuItemProps)
const Menu: React.FC<MenuProps> = (props) => {
    const {style, defaultIndex, className, mode, onSelect, children} = props
    const [currentIndex, setCurrentIndex] = useState(defaultIndex)//active状态值
    const defaultItemProps: menuItemProps = {
        currentIndex: currentIndex || 0,
        itemSelect: (index: number) => {
            setCurrentIndex(index)
            if (onSelect) {
                onSelect(index)
            }
        }
    }
    const renderChildren = () => {
        //此方法判断是否为menuItem组件，且依次返回子组件在父组件中的索引
        return React.Children.map(children, (child, index) => {
            const ch = child as React.FunctionComponentElement<MenuItemProps>
            if (ch.type.displayName === 'menu-item') {//是否为menuItem组件
                return React.cloneElement(ch, {index})//给children新增index属性
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
    defaultIndex: 0
}
export default Menu
