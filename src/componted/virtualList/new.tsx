import React, { useCallback } from 'react';
import useVirtual from 'react-cool-virtual';

interface VirtualListProps {
    data: any[];
    loadMore: () => void;
    isItemLoaded: (index: number) => boolean;
    loadMoreCount: number;
    renderItem: (item: any, index: number) => JSX.Element;
    noDataText: string;
    reachedEndText: string;
    itemsPerRow: number;
    itemHeight: number;
}

const VirtualList: React.FC<VirtualListProps> = ({
                                                     data,
                                                     loadMore,
                                                     isItemLoaded,
                                                     loadMoreCount,
                                                     renderItem,
                                                     noDataText,
                                                     reachedEndText,
                                                     itemsPerRow,
                                                     itemHeight,
                                                 }) => {
    const rowVirtualizer = useVirtual<HTMLDivElement>({
        itemCount: Math.ceil(data.length / itemsPerRow),
        itemSize: itemHeight,
        loadMoreCount,
        isItemLoaded,
        loadMore,
    });

    const getItemIndex = useCallback((rowIndex: number, colIndex: number) => {
        return rowIndex * itemsPerRow + colIndex;
    }, [itemsPerRow]);

    if (data.length === 0) {
        return <div>{noDataText}</div>;
    }

    return (
        <div ref={rowVirtualizer.outerRef} style={{ overflow: 'auto' }}>
            <div ref={rowVirtualizer.innerRef}>
                {rowVirtualizer.items.map(({ index, size }) => (
                    <div key={index} style={{ height: `${size}px`, display: 'flex' }}>
                        {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
                            const itemIndex = getItemIndex(index, colIndex);
                            const item = data[itemIndex];
                            return (
                                <div key={colIndex} style={{ flex: 1 }}>
                                    {item ? renderItem(item, itemIndex) : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualList;
