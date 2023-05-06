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


interface itemResType {
    login: string
}

library.add(fas)//添加所有图标
export interface listProps {
    number: number,
    value: string
}

function App() {

    const data: listProps[] = [{value: 'yjh', number: 1}, {value: 'j', number: 2}]
    const seacrhFnHanlde = async (str: string) => {
        // 同步
        // return data.filter(item => {
        //     return item.value.includes(str)
        // })
        //异步
        return fetch(`https://api.github.com/search/users?q=${str}`).then(res => res.json()).then(({items}) => {
            return items.map((item: itemResType) => ({
                value: item.login,
                ...item
            }))
        })

    }
    const se = (val: autoCompleteDataType) => {
        console.log(val)
    }
    const customTemplete = (item: autoCompleteDataType) => {
        const item1 = item as autoCompleteDataType<listProps>
        return (
            <div>
                <h1>
                    name: {item1.value} age: 0
                </h1>
            </div>
        )
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
                <AutoComplete searchFn={seacrhFnHanlde} Selcte={se} customTemplete={customTemplete}
                ></AutoComplete>
            </header>
        </div>
    );
}

export default App;
