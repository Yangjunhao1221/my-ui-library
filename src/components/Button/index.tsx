import React from 'react'
export enum buttonSize  {
    Large=' large',
    Middle='middle',
    Small = 'small'
}
export enum buttonType{
    Primary = 'primary',
    Danger = 'danger',
    Disabled = 'disabled',
    Link='link'
}
interface buttonProps{
    btnType: buttonType,
    
    
}
const Button:buttonProps=(props)=> {
  return (
    <div>Button</div>
  )
}
export default Button