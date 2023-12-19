/* eslint-disable jsx-a11y/accessible-emoji */

import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import useVirtual from "react-cool-virtual";

import "./ceshiScorl.scss";

const FixedSize = forwardRef((props, ref) => {
  const [align, setAlign] = useState("auto");
  const { outerRef, innerRef, items, scrollTo, scrollToItem } = useVirtual({
    itemCount: 1000
  });
      

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
      <button onClick={() => scrollToItem({ index: 500, align })}>
        Scroll to 500th
      </button>
      <select onChange={({ target }) => setAlign(target.value)}>
        <option value="auto">Auto</option>
        <option value="start">Start</option>
        <option value="center">Center</option>
        <option value="end">End</option>
      </select>
      <div
        className="outer"
        style={{ width: "300px", height: "300px", overflow: "auto" }}
        ref={outerRef}
      >
        <div ref={innerRef}>
          {items.map(({ index, size }) => (
            <div
              key={index}
              className={`item ${index % 2 ? "dark" : ""}`}
              style={{ height: `${size}px` }}
            >
              ♻️ {index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default FixedSize;
