import React, { useState, useEffect, useCallback } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import './GridDisplay.scss'; // 确保引入了相应的CSS样式

interface GridDisplayProps {
    data: any[]; // 数据数组
    renderItem: (item: any) => JSX.Element; // 自定义渲染函数
    itemWidth: number; // 每个项目的宽度
    itemHeight: number; // 每个项目的高度
    className?: string; // 自定义类名
}

const GridDisplay: React.FC<GridDisplayProps> = ({ data, renderItem, itemWidth, itemHeight, className }) => {
    const [computedItemsPerRow, setComputedItemsPerRow] = useState(0);
    const listRef = React.createRef<List>();

    const calculateItemsPerRow = useCallback(({ width }) => {
        return Math.floor(width / itemWidth) || 1;
    }, [itemWidth]);

    const rowRenderer = ({ index, key, style }) => {
        const items = [];
        const fromIndex = index * computedItemsPerRow;
        const toIndex = Math.min(fromIndex + computedItemsPerRow, data.length);

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <div key={i} style={{ width: itemWidth }}>
                    {renderItem(data[i])}
                </div>
            );
        }

        return (
            <div key={key} style={style} className="grid-row">
                {items}
            </div>
        );
    };

    const onResize = ({ width }) => {
        const newItemsPerRow = calculateItemsPerRow({ width });
        if (newItemsPerRow !== computedItemsPerRow) {
            setComputedItemsPerRow(newItemsPerRow);
            listRef.current?.recomputeRowHeights();
        }
    };

    return (
        <div className={className}>
            <AutoSizer onResize={onResize}>
                {({ width, height }) => (
                    <List
                        ref={listRef}
                        width={width}
                        height={height}
                        rowCount={Math.ceil(data.length / computedItemsPerRow)}
                        rowHeight={itemHeight}
                        rowRenderer={rowRenderer}
                        overscanRowCount={3}
                    />
                )}
            </AutoSizer>
        </div>
    );
};

export default GridDisplay;
