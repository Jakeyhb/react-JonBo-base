import React, { useState, useEffect, useRef } from "react";
import useVirtual  from "react-cool-virtual";

interface VirtualListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  initialItemsPerRow?: number;
  onPageChange?: (currentPage: number) => void;
  onLoadMore?: (currentPage: number) => Promise<void>;
  itemHeight?: number;
  loadingText?: string;
  noDataText?: string;
  noMoreDataText?: string;
}

const VirtualList = <T,>({
  data,
  renderItem,
  className,
  initialItemsPerRow = 2,
  onPageChange,
  onLoadMore,
  itemHeight = 50,
  loadingText = "加载中...",
  noDataText = "暂无数据",
  noMoreDataText = "没有更多数据了",
}: VirtualListProps<T>) => {
  const [itemsPerRow, setItemsPerRow] = useState(initialItemsPerRow);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { outerRef, innerRef, items, scrollToItem, loadMore } = useVirtual({
    itemCount: data.length,
    itemSize: itemHeight,
    outerElementType: "div",
  });

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const calculateColumns = () => {
    const containerWidth = innerRef.current.clientWidth;
    const newItemsPerRow = Math.floor(containerWidth / (100 + 16)); // Adjust the width (100) as needed
    if (newItemsPerRow !== itemsPerRow) {
      setItemsPerRow(newItemsPerRow);
      scrollToItem({ index: items[items.length - 1].index });
    }
  };

  useEffect(() => {
    calculateColumns();
    window.addEventListener("resize", calculateColumns);
    return () => {
      window.removeEventListener("resize", calculateColumns);
    };
  }, [itemsPerRow]);

  const handleLoadMore = async () => {
    if (onLoadMore && !loading) {
      setLoading(true);
      try {
        await onLoadMore(currentPage);
        setCurrentPage(currentPage + 1);
        loadMore();
      } catch (error) {
        console.error("加载更多数据出错:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={className}>
      <div ref={outerRef} style={{ height: "300px", overflowY: "auto" }}>
        <div ref={innerRef} style={{ height: `${items.length * itemHeight}px` }}>
          {items.map((item) => (
            <div key={item.index} style={{ width: `${100 / itemsPerRow}%`, boxSizing: "border-box", padding: "8px" }}>
              {renderItem(data[item.index])}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {loading && <div>{loadingText}</div>}
          {!loading && data.length === 0 && <div>{noDataText}</div>}
          {!loading && data.length > 0 && (
            <button onClick={handleLoadMore}>
              {loading ? loadingText : noMoreDataText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
