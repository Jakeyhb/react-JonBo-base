import React, { useState, useCallback } from 'react';
import useVirtual from 'react-cool-virtual';

interface VirtualGridListProps {
    dataSource: any[];
    renderItem: (item: any, index: number) => JSX.Element;
    loadMore: () => void;
    noDataText?: string;
    reachEndText?: string;
    itemsPerRow?: number;
}

const VirtualGridList: React.FC<VirtualGridListProps> = ({
                                                             dataSource,
                                                             renderItem,
                                                             loadMore,
                                                             noDataText = '没有更多数据',
                                                             reachEndText = '已经到底了',
                                                             itemsPerRow = 3,
                                                         }) => {
    const [isGrid, setIsGrid] = useState(true);
    const toggleLayout = () => setIsGrid(!isGrid);

    const rowRenderer = useCallback(({ index, measureRef }) => {
        if (index * itemsPerRow >= dataSource.length) {
            return (
                <div ref={measureRef} style={{ width: '100%' }}>
                    {index * itemsPerRow < dataSource.length + itemsPerRow ? loadMore() : <p>{reachEndText}</p>}
                </div>
            );
        }

        const items = [];
        for (let i = index * itemsPerRow; i < Math.min(index * itemsPerRow + itemsPerRow, dataSource.length); i++) {
            items.push(renderItem(dataSource[i], i));
        }

        return <div ref={measureRef} style={{ display: 'flex', justifyContent: 'space-around' }}>{items}</div>;
    }, [dataSource, itemsPerRow, loadMore, reachEndText, renderItem]);

    const { outerRef, innerRef } = useVirtual({
        itemCount: Math.ceil(dataSource.length / itemsPerRow) + 1,
        overscan: 3,
    });

    if (!dataSource.length) {
        return <p>{noDataText}</p>;
    }

    return (
        <div>
            <button onClick={toggleLayout}>{isGrid ? '切换到列表' : '切换到九宫格'}</button>
            <div ref={outerRef} style={{ overflow: 'auto', height: '80vh' }}>
                <div ref={innerRef}>
                    {rowRenderer}
                </div>
            </div>
        </div>
    );
};

export default VirtualGridList;
