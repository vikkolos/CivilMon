import React, { useRef, useState, useEffect } from "react";
import React from 'react'

function xyz() {
    const containerRefr = useRef(null)
    const cardRefr = useRef(null)

    const [canslideleft,setcanslideleft]=useEffect(false)
    const [canslideright,setcanslideright]=useEffect(false)

    const checkScrolling = () =>{
        const ele=containerRefr.current;
        if(!ele) return;

        setcanslideleft(el.scrollLeft >0);
        setcanslideright(
            el.scrollLeft + el.clientWidth < el.scrollWidth
        );
    }

    
  return (
    <>
    </>
  )
}

export default xyz