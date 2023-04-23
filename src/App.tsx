import React from 'react';
import Button from './components/Button/index'
import {buttonType, buttonSize} from './components/Button/index';
import Menu from './components/menu';
import MenuItem from './components/menuItem';
import SubMenu from "./components/menu/SubMenu";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button size={buttonSize.Large}>测试1111</Button>
                <Button disabled btnType={buttonType.Primary} size={buttonSize.Small}>测试1111</Button>
                <Button btnType={buttonType.Primary} size={buttonSize.Small}>测试</Button>
                <Button btnType={buttonType.Link} size={buttonSize.Small} href='http://www.baidu.com' target='_blank'
                        onClick={() => {
                            alert(123)
                        }}>baidu link</Button>
                <Button btnType={buttonType.Link} size={buttonSize.Large} disabled>baidu link</Button>
                <Menu defaultOpenSubMenu={['1']} defaultIndex={'0'} mode={'vertical'}
                      onSelect={(index: string) => {
                          // console.log(index)
                      }}
                >
                    <MenuItem>1一级菜单</MenuItem>
                    <SubMenu title={'2一级菜单'}>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title={'2一级菜单'}>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                        <MenuItem>
                            二级菜单
                        </MenuItem>
                    </SubMenu>
                    <MenuItem disabled>3一级菜单</MenuItem>
                    <MenuItem>4一级菜单</MenuItem>
                </Menu>
            </header>
        </div>
    );
}

export default App;
