import React from 'react';
import Button from './components/Button/index'
import { buttonType, buttonSize } from './components/Button/index';
import Menu from './components/menu';
import MenuItem from './components/menuItem';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button size={buttonSize.Large}>测试1111</Button>
        <Button disabled btnType={buttonType.Primary} size={buttonSize.Small}>测试1111</Button>
        <Button btnType={buttonType.Primary} size={buttonSize.Small}>测试</Button>
        <Button btnType={buttonType.Link} size={buttonSize.Small} href='http://www.baidu.com' target='_blank' onClick={() => { alert(123) }}>baidu link</Button>
        <Button btnType={buttonType.Link} size={buttonSize.Large} disabled>baidu link</Button>
        <Menu defaultIndex={0} mode='horizontal' onSelect={(index:number)=>{;
        }}>
          <MenuItem index={0} >1</MenuItem>
          <MenuItem index={1} disabled>2</MenuItem>
          <MenuItem index={2}>3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
