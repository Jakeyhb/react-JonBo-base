import { useState } from "react";
import useVirtual from "react-cool-virtual";
interface itemInteface {
    id: number,
    text: string
}
interface MyVirtualListProps {
    isItemLoadedArr: boolean[],
    dataSource: itemInteface[],
    itemSize: number,
    pageSize: number
    onMoreLoad: (e)=> void,
    renderItem:JSX.Element
}
const isItemLoadedArr = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const MyVirtualList = (props: MyVirtualListProps) => {
    const [comments, setComments] = useState(props.dataSource);

    const { outerRef, innerRef, items } = useVirtual({
        itemCount: comments.length,
        // Estimated item size (with padding)
        itemSize: props.itemSize,
        // The number of items that you want to load/or pre-load, it will trigger the `loadMore` callback
        // when the user scrolls within every items, e.g. 1 - 5, 6 - 10, and so on (default = 15)
        loadMoreCount: props.pageSize,
        // Provide the loaded state of a batch items to the callback for telling the hook
        // whether the `loadMore` should be triggered or not
        isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
        // We can fetch the data through the callback, it's invoked when more items need to be loaded
        loadMore: (e) => loadData(e, setComments),
    });

    return (
        <div
            style={{ width: "300px", height: "300px", overflow: "auto" }}
            ref={outerRef}
        >
            <div ref={innerRef}>
                {items.map(({ index, measureRef }) => (
                    <div
                        key={comments[index]?.id || `fb-${index}`}
                        style={{ padding: "16px", minHeight: "122px" }}
                        ref={measureRef} // Used to measure the unknown item size
                    >
                        {comments[index]?.text || "⏳ Loading..."}
                    </div>
                ))}
            </div>
        </div>
    );
};
