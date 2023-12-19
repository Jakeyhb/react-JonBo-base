import React, { useState } from "react";
import VirtualScroll from "../virtualList/VirtualScroll.tsx";

export const Demo = () => {
    const [columns, setColumns] = useState(1);
    const dataSource = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

    const loadMoreData = (index) => {
        return Array.from({ length: 10 }, (_, i) => `Item ${index * 10 + i + 101}`);
    };

    const renderItem = (item, index) => (
        <div style={{ border: '1px solid #ddd', margin: '5px', padding: '10px' }}>
            {item}
        </div>
    );

    return (
        <div>
            <button onClick={() => setColumns(columns === 1 ? 3 : 1)}>
                切换布局
            </button>
            <VirtualScroll
                dataSource={dataSource}
                renderItem={renderItem}
                onMoreLoad={loadMoreData}
                columns={columns}
            />
        </div>
    );
};


