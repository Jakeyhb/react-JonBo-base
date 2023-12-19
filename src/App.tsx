
import React, { useRef, useState } from 'react';

import VirtualList from './componted/virtualList/VirtualScroll';

import FixedSize from './componted/virtualList/ceshiScorll';
import CustomForm from "./componted/Form";
const App = () => {
    const [data, setData] = useState(Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`));
    const [itemsPerRow, setItemsPerRow] = useState(1);
    const listRef = useRef();
    const listRef2 = useRef();
    console.log(12)
    const formConfig = [
        {
            type: 'cascader',
            label: '地址',
            name: 'address',
            options: [
                // 这里应该是你的省市区数据
                { label: '省份1', value: 'province1', children: [{ label: '城市1', value: 'city1' }] },
                // ...更多省市区数据
            ]
        },
        {
            type: 'input',
            label: '邮编',
            name: 'postalCode',
            editable: false // 邮编默认不可编辑
        },
        { type: 'input', label: '姓名', name: 'name', editable: true },
        { type: 'select', label: '职业', name: 'job', options: [{ label: '工程师', value: 'engineer' }, { label: '设计师', value: 'designer' }] },
        // ...其他配置项
    ];
const scrollToSpecificItem = () => {
    if (listRef.current) {
        // debugger
        // listRef.current.scrollToItemFn();
        listRef.current.scrollToFn()
        console.log(12121)
    }
};
    const toggleItemsPerRow = () => { 
        // setItemsPerRow(itemsPerRow === 1 ? 3 : 1);
        scrollToSpecificItem()
    }
    const handelClick = () => { 
        listRef2.current.scrollToFn()
    }
    // 表单提交时的处理函数
    const handleSubmit = (values) => {
        console.log('表单数据:', values);
        // 这里可以添加提交表单的逻辑，比如发送请求到后端服务器
    };


    const renderItem = (item, index) => <div style={{ padding: 10, border: '1px solid #ddd' }}>{item}</div>;

    return (
        <><div style={{height: '200px', overflow: 'auto'}}>
            <button onClick={toggleItemsPerRow}>
                Toggle Items Per Row (Current: {itemsPerRow})
            </button>
            <VirtualList
                data={data}
                ref={listRef}
                loadMore={() => {}}
                isItemLoaded={() => true}
                loadMoreCount={10}
                renderItem={renderItem}
                noDataText="No data available"
                reachedEndText="End of list"
                itemsPerRow={itemsPerRow}
                itemHeight={50}
            />
        </div>
            
            <div>
                <button onClick={handelClick}></button>
                ---------
                <FixedSize ref={ listRef2}></FixedSize>
            </div>


            <div>


                <CustomForm config={formConfig} onSubmit={handleSubmit} />;

            </div>
        </>
    );
};

export default App;