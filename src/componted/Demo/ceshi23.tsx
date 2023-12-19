// import Demo from './componted/Demo/index.tsx'
import React, {useState} from "react";
import {Indicator} from '../src/componted/virtualList'
import axios from "axios";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function App() {
    const isItemLoadedArr: any = []
    const [data, setdata] = useState([]);
    const [loadIndex, setloadIndex] = useState(1)
    const [columns, setColumns] = useState(1); // 默认为单列
    const loadData = async (setComments) => {
        // Set the state of a batch items as `true`
        // to avoid the callback from being invoked repeatedly
        isItemLoadedArr[loadIndex] = true;

        try {
            // Simulating a slow network
            await sleep(3000);
            const { data: comments } = await axios(
                `https://jsonplaceholder.typicode.com/comments?postId=${loadIndex}`
            );

            setComments((prevComments) => [...prevComments, ...comments]);
            setloadIndex(loadIndex+ 1)
        } catch (err) {
            // If there's an error set the state back to `false`
            isItemLoadedArr[loadIndex] = false;
            // Then try again
            loadData(setComments);
        }
    };
    return (
        <>
            <button onClick={() => setColumns(columns === 1 ? 3 : 1)}>
                {columns === 1 ? "切换到九宫格" : "切换到列表"}
            </button>
            <Indicator  columns={columns}  loadIndex={loadIndex} loadData={loadData} comments={data} setComments={setdata} isItemLoadedArr={isItemLoadedArr} />

        </>
    )
}

export default App
