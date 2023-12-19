import React, { useState } from 'react';
// import  from './path/to/VirtualGridList'; // 确保这里的路径正确

import VirtualGridList from "./20bb.tsx";
interface Item {
    id: number;
    name: string;
}

const SamplePage2233: React.FC = () => {
    // 示例数据
    const [data, setData] = useState<Item[]>([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        // ...更多数据项
    ]);

    // 模拟加载更多数据
    const loadMore = () => {
        const moreData = [
            { id: data.length + 1, name: `Item ${data.length + 1}` },
            { id: data.length + 2, name: `Item ${data.length + 2}` },
            { id: data.length + 3, name: `Item ${data.length + 3}` },
            { id: data.length + 4, name: `Item ${data.length + 4}` },
            { id: data.length + 5, name: `Item ${data.length + 5}` },
            { id: data.length + 6, name: `Item ${data.length + 6}` },
            { id: data.length + 7, name: `Item ${data.length + 7}` },
            // ...可以根据需要生成更多数据
        ];
        setData([...data, ...moreData]);
    };

    // 定义如何渲染每个项目
    const renderItem = (item: Item, index: number) => (
        <div key={index} style={{ border: '1px solid #ccc',color: 'red', padding: '10px', margin: '5px' }}>
            <h3>{item.name}</h3>
        </div>
    );

    return (
        <div>
            <VirtualGridList
                dataSource={data}
                renderItem={renderItem}
                loadMore={loadMore}
                noDataText="没有更多数据"
                reachEndText="已经到底了"
                itemsPerRow={3} // 一行显示3个项目
            />
        </div>
    );
};

export default SamplePage2233;
