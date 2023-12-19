import React, { useCallback,forwardRef, useImperativeHandle } from 'react';
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

const VirtualList = forwardRef((props, ref) => {
    const {  data,loadMore,isItemLoaded,loadMoreCount,renderItem,noDataText,reachedEndText,itemsPerRow,itemHeight} = props
    const {outerRef, innerRef, items, scrollTo, scrollToItem } = useVirtual<HTMLDivElement>({
        itemCount: Math.ceil(data.length / itemsPerRow),
        itemSize: itemHeight,
        loadMoreCount:loadMoreCount,
        isItemLoaded:isItemLoaded,
        loadMore:loadMore,
    });


    const getItemIndex = useCallback((rowIndex: number, colIndex: number) => {
        return rowIndex * itemsPerRow + colIndex;
    }, [itemsPerRow]);

    if (data.length === 0) {
        return <div>{noDataText}</div>;
    }
    // const scrollToItemFn = () => {
    //     scrollToItem({ index: 100, align: "auto" });
    //     //  scrollTo(15000)}
    // }
    //   const scrollToFn = () => {
    //     // scrollToItem({ index: 100, align: "auto" });
    //     //  scrollTo(15000)}
    //  }
    

    const scrollToItemFn = useCallback(() => {
        console.log('ceshi')
     
        // const row = Math.floor(index / itemsPerRow);
        scrollToItem({ index: 90 });
 }, []);
     const scrollToFn = useCallback(() => {
        // const row = Math.floor(index / itemsPerRow);
        scrollTo({ index: 1000 });
    }, []);



    useImperativeHandle(ref, () => ({
        scrollToItemFn,
        scrollToFn,
        // 可以添加其他方法和属性
    }));



    return (
        <>
             <button onClick={() => scrollTo(15000)}>Scroll to 15000px</button>
      <button onClick={() => scrollToItem({ index: 500, align: 'center' })}>
        Scroll to 500th
      </button>
          <div ref={outerRef} style={{ overflow: 'auto' }}>
            <div ref={innerRef}>
                    {items.map(({ index, size }) => (
                        
                    <div key={index} style={{ height: `${size}px`, display: 'flex' }}>
                            {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
                            console.log(index)
                            const itemIndex = getItemIndex(index, colIndex);
                            const item = data[itemIndex];
                            // console.log(index)
                            return (
                                <div key={index} style={{ flex: 1 }} className={`item ${index % 2 ? "dark" : ""}`}>
                                    {item ? renderItem(item, itemIndex) : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div></>
      
    );
});

export default VirtualList;
