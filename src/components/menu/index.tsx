import React, { createContext, useState } from 'react'
import classnames from 'classnames'
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
  currentIndex:number
}
const defaultMenuItemProps:menuItemProps = {
  currentIndex: 0,
  itemSelect:(index=0)=>{}
}
export const menuContext = createContext(defaultMenuItemProps)
const Menu: React.FC<MenuProps> = (props) => {
  const { style, defaultIndex, className, mode, onSelect, children } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const defaultItemProps:menuItemProps = {
    currentIndex: currentIndex||0,
    itemSelect: (index: number) => {
      setCurrentIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const classes = classnames("viking-menu", className, {
    "menu-vertical": mode === "vertical", // 竖-菜单(默认横)
    "menu-horizontal": mode !== "vertical",
  })
   
  return (
    <ul style={style} className={classes} data-testid="test-menu">
      <menuContext.Provider value={defaultItemProps}>
            {children}
      </menuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
}
export default Menu