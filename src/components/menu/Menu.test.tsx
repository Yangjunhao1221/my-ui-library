import React from "react";
import { cleanup, fireEvent, render, RenderResult, } from "@testing-library/react"
import Menu, { MenuProps } from "../menu";
import MenuItem from "../menuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test"
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical"
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem disabled >
        disabled
      </MenuItem>
      <MenuItem>
        goods
      </MenuItem>
      {/* <li></li> */}
    </Menu>
  )
}


let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
const setup = () => render(generateMenu(testProps));

describe("test Menu And MenuItem component", () => {
  // 初始函数
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = setup()
    // getByTestId: 通过属性 data-testid 来获取对应的  DOM
    // eslint-disable-next-line testing-library/prefer-screen-queries
    menuElement = wrapper.getByTestId("test-menu")
    // eslint-disable-next-line testing-library/prefer-screen-queries
    activeElement = wrapper.getByText("active")
    // eslint-disable-next-line testing-library/prefer-screen-queries
    disabledElement = wrapper.getByText("disabled")
  })

  // 测试组件默认属性是否正常显示
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("viking-menu test")
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByTagName("li").length).toEqual(3)
    expect(activeElement).toHaveClass("menu-item is-active")
    expect(disabledElement).toHaveClass("menu-item is-disabled")

  })
  // 点击item是否触发回调
  it("click items should change active and call the right callback", () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const thirdItem = wrapper.getByText("goods")
    // 点击 menuItem(goods) index:2
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass("is-active")
    expect(activeElement).not.toHaveClass("is-active")
    // 验证是否已使用正确的参数调用了所监视的方法
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // 检查原本选中的菜单是否存在 is-active
    expect(activeElement).not.toHaveClass("is-active")
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass("is-active")
    // 检查是否调用了选中函数并传入了1
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)

  })
  // 更换menu类型(横向/纵向)
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup()
    // 卸载使用渲染安装的 React 树。

    // 请注意，如果您使用的测试框架支持全局测试框架并将其注入到您的测试环境（如 mocha、Jest 和 Jasmine），
    // 则会自动完成此操作。如果没有，则需要在每次测试后进行手动清理。afterEach
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(generateMenu(testVerProps))
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const menuElement = wrapper.getByTestId("test-menu")
    // 测试修改menu为纵向是 className 中是否存在vertical
    expect(menuElement).toHaveClass("menu-vertical")

  })

})