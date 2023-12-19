import React ,{ Fragment, useState } from "react";
import useVirtual from "react-cool-virtual";
import "./styleceshi.scss";

const TOTAL_COMMENTS = 500;
const BATCH_COMMENTS = 5;
const isItemLoadedArr = [];
isItemLoadedArr[50] = true;

const Loading = () => <div className="item">⏳ Loading...</div>;

export const Indicator = (props: any) => {
    const { isItemLoadedArr, loadData, setComments, comments, loadIndex, columns } = props;

    const { outerRef, innerRef, items } = useVirtual({
        itemCount: comments.length,
        loadMoreCount: BATCH_COMMENTS,
        isItemLoaded: () => isItemLoadedArr[loadIndex],
        loadMore: () => loadData(setComments)
    });

    // 计算项目宽度，根据列数
    const itemWidth = `calc(${100 / columns}% - 20px)`;

    return (
        <div
            className="outer"
            style={{ width: "300px", height: "500px", overflow: "auto" }}
            ref={outerRef}
        >
            <div ref={innerRef} style={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.length ? (
                    items.map(({ index, measureRef }) => {
                        const showLoading =
                            index === comments.length - 1 && comments.length < TOTAL_COMMENTS;

                        return (
                            <Fragment key={comments[index].id}>
                                <div
                                    className={`item ${index % 2 ? "dark" : ""}`}
                                    style={{ padding: "16px", color: 'red', width: itemWidth }}
                                    ref={measureRef}
                                >
                                    {comments[index].id}. {comments[index].body}
                                </div>
                                {showLoading && <Loading />}
                            </Fragment>
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};
