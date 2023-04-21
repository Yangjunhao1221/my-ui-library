import React from "react";
import Button from "./index";
import {fireEvent, render} from "@testing-library/react";
import {buttonType, buttonSize} from "./index";

const defaultProps = {
    onClick: jest.fn()
}
const btnDefaultAttribute = {
    btnType: buttonType.Primary,
    size: buttonSize.Large,
    className: "klass"
}
const testLink = {
    btnType: buttonType.Link,
    href: 'http://baidu.com'
}
const testDisbaleBtn = {
    disabled: true,
    onClick: jest.fn()
}
describe('Button Components Test', () => {
    test('测试默认button', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const warpper = render(<Button {...defaultProps}>Nice</Button>)//渲染dom
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = warpper.getByText("Nice") as HTMLButtonElement//获取元素
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeFalsy()
        expect(element.tagName).toEqual("BUTTON")
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    test('测试添加属性是否存在', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const warpper = render(<Button  {...btnDefaultAttribute}>Nice</Button>)//渲染dom
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = warpper.getByText("Nice")//获取元素
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("BUTTON")
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    test('测试a链接', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const warpper = render(<Button  {...testLink}>Link</Button>)//渲染dom
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = warpper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
    })
    test('测试disable', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const warpper = render(<Button {...testDisbaleBtn}>disabled</Button>)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = warpper.getByText('disabled') as HTMLButtonElement
        fireEvent.click(element)
        expect(testDisbaleBtn.onClick).not.toHaveBeenCalled()
        expect(element.disabled).toBeTruthy()//检测属性是否为true
    })
})

