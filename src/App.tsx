
import React, { useRef, useState } from 'react';

import VirtualList from './componted/virtualList/VirtualScroll';

import FixedSize from './componted/virtualList/ceshiScorll';
const App = () => {
    const [data, setData] = useState(Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`));
    const [itemsPerRow, setItemsPerRow] = useState(1);
    const listRef = useRef();
    const listRef2 = useRef();
    console.log(12)

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
        </>
    );
};

export default App;