import React from 'react'
import classNames from 'classnames'
export enum buttonSize  {
    Large='lg',
    Small = 'sm'
}
export enum buttonType{
    Primary = 'primary',
    Danger = 'danger',
    Default = 'default',
    Link='link'
}
interface buttonProps{
    btnType?: buttonType, 
    disabled?: boolean,
    href?: string,
    children?:React.ReactNode,
    size?: buttonSize,
    className?: string,//自定义样式
}
type buttonNativeAttribute = React.ButtonHTMLAttributes<HTMLElement> & buttonProps
type anchorNativeAttribute=React.AnchorHTMLAttributes<HTMLElement>&buttonProps
export type allButtonAttribute=buttonNativeAttribute&anchorNativeAttribute
const Button: React.FC<allButtonAttribute> = (props) => {
    const { btnType, disabled, href, size, className, children ,...restAttribute} = props
    const btnClass=classNames('btn',className,{'btn-default':!btnType,[`btn-${btnType}`]:btnType,[`btn-${size}`]:size,disabled:btnType === buttonType.Link&&disabled},)
    if (btnType === buttonType.Link) {
        return <a {...restAttribute}  className={btnClass} href={href}>{children}</a>
    } else {
        return <button {...restAttribute} className={btnClass} disabled={disabled}>{children }</button>
    }

}
Button.defaultProps = {
    btnType: buttonType.Default,
    size: buttonSize.Large
}
export default Button