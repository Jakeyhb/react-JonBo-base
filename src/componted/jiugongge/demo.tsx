import React, { useState } from 'react';
import GridDisplay from "./GridDisplay.tsx"; // 确保这里的路径正确
import './GridDisplay.scss'; // 引入SCSS样式

interface Item {
    id: number;
    name: string;
}

const SamplePage: React.FC = () => {
    const [data, setData] = useState<Item[]>([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        // ...更多数据项
    ]);

    const [isGrid, setIsGrid] = useState<boolean>(true); // 控制显示模式

    // 渲染每个项目
    const renderItem = (item: Item) => (
        <div className={`item ${isGrid ? 'grid-item' : 'list-item'}`}>
            <h3>{item.name}</h3>
        </div>
    );

    // 切换布局模式
    const toggleLayout = () => {
        setIsGrid(!isGrid);
    };

    return (
        <div>
            <button onClick={toggleLayout}>切换布局</button>
            <GridDisplay
                data={data}
                renderItem={renderItem}
                itemWidth={isGrid ? 200 : '100%'} // 横向平铺时占满宽度
                itemHeight={isGrid ? 300 : 100} // 根据模式调整高度
                className="custom-grid"
            />
        </div>
    );
};

export default SamplePage;
