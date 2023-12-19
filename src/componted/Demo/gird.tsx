import React, { Fragment } from "react";
import useVirtual from "react-cool-virtual";
import './stylegird.scss';

const Grid = () => {
    const totalCols = 3; // 每行显示的元素数量，包括第四行

    const row = useVirtual({
        itemCount: 10
    });
    const col = useVirtual({
        horizontal: true,
        itemCount: totalCols,
        itemSize: 100
    });

    return (
        <div
            className="outer"
            style={{ width: "400px", height: "400px", overflow: "auto" }}
            ref={(el) => {
                row.outerRef.current = el;
                col.outerRef.current = el;
            }}
        >
            <div
                style={{ position: "relative", color: 'red' }}
                ref={(el) => {
                    row.innerRef.current = el;
                    col.innerRef.current = el;
                }}
            >
                {row.items.map((rowItem) => (
                    <Fragment key={rowItem.index}>
                        {col.items.map((colItem) => {
                            const index = rowItem.index * totalCols + colItem.index;
                            return (
                                <div
                                    key={index}
                                    className={`item ${
                                        rowItem.index % 2
                                            ? colItem.index % 2
                                                ? "dark"
                                                : ""
                                            : !(colItem.index % 2)
                                                ? "dark"
                                                : ""
                                    }`}
                                    style={{
                                        position: "absolute",
                                        height: `${rowItem.size}px`,
                                        width: `${colItem.size}px`,
                                        transform: `translateX(${colItem.start}px) translateY(${rowItem.start}px)`
                                    }}
                                >
                                    ♻️ {index}
                                </div>
                            );
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Grid;
