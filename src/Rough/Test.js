import React, { useEffect } from 'react'
import { data, update } from "./PostRough"
import { Button } from '@mui/material'


function Test() {
    console.log("test1",data)

   
    const sendData=()=>{
        const obj = { name: "orange" }
        update(obj)
        console.log(data)
    }
    return (
        <div>
<Button onClick={sendData} variant='contained'>click</Button>
        </div>
    )
}

export default Test
