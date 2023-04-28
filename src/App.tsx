import React from 'react';
import Button from './components/Button/index'
import {buttonType, buttonSize} from './components/Button/index';
import Menu from './components/menu';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import MenuItem from './components/menuItem';
import SubMenu from "./components/menu/SubMenu";
import Input from "./components/Input";
import Icon from "./components/Icon";
import AutoComplete, {autoCompleteDataType} from "./components/AutoComplete";


library.add(fas)//添加所有图标
export interface listProps {
    number: number,
}

function App() {

    const data = [{value: 'yjh', number: 1}, {value: 'j', number: 2}]
    const seacrhFnHanlde = (str: string): autoCompleteDataType<listProps>[] => {
        return data.filter(item => {
            return item.value.includes(str)
        })
        //异步
        // setTimeout(async () => {
        //     let arr: autoCompleteDataType[] = []
        //     arr = await data.filter(item => {
        //         return item.value.includes(str)
        //     })
        //     return arr
        // }, 3000)
        // 模拟请求
        // fetch('/a').then(async (res) => {
        //     const arr: autoCompleteDataType[] = await res.json()
        //     if (arr.length) {
        //         return arr.filter(i => {
        //             return i.value.includes(str)
        //         })
        //     }
        // })
    }
    const se = (val: autoCompleteDataType[]) => {
        console.log(val)
    }

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
                <Menu mode='horizontal' defaultOpenSubMenu={['1']} defaultIndex={'0'}
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
                &nbsp; <Input size={'sm'} icon={'calendar-days'}
                              startNode={<Icon icon='calendar-days'></Icon>} endNode={'.com'}></Input>
                <AutoComplete value={'111'} searchFn={seacrhFnHanlde} Selcte={se}></AutoComplete>
            </header>
        </div>
    );
}

export default App;
