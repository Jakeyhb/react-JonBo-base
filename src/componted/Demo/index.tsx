import React, { useState, useCallback } from 'react';

import MyVirtualList from '../virtualList';

const  isItemLoadedArr = []
const Demo = () => {

    const [data, setData] = useState<number[]>(Array.from({ length: 10 }, (_, i) => i));

    const [loading, setLoading] = useState(false);

    // const loadMoreData = async ({ loadIndex }, setdataScrouce) => {
    //     console.log(loadIndex)
    //     // Set the state of a batch items as `true`
    //     // to avoid the callback from being invoked repeatedly
    //     isItemLoadedArr[loadIndex] = true;
    //     console.log(loadIndex)
    //     try {
    //         // Simulating a slow network
    //
    //         const con = Array.from({ length: 10 }, (_, i) => i)
    //         loadIndex + 1
    //         setdataScrouce((prevComments) => [...prevComments, ...con]);
    //         console.log(con)
    //     } catch (err) {
    //         // If there's an error set the state back to `false`
    //         isItemLoadedArr[loadIndex] = false;
    //         // Then try again
    //         loadMoreData({ loadIndex }, setdataScrouce);
    //     }
    // };


    return (
        <div className='datalistceshi' style={{overflow: 'auto', width:'300px', height: '500px'}}>
            <MyVirtualList

                data={data}

                renderItem={(item) => <div style={{ height: '30px' }}>{item}</div>}

                onMoreLoad={loadMoreData}

                loading={loading}
                isItemLoadedArr={isItemLoadedArr}

                noDataText="暂无数据"

            />
        </div>



    );

};

export default Demo;