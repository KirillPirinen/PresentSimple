import {createContext, useContext, useState} from 'react';
import {useSelector} from "react-redux"; 

const formContext = createContext();

export const FormContextProvider = ({children}) => {
  //const {status, ranges} = useSelector(state => state.sentForm)
  // const ranges = [
  //   {id: 1, from:0, to:1000, payload:[]},
  //   {id: 2, from:1000, to:3000, payload:[]},
  //   {id: 3, from:3000, to:5000, payload:[]},
  //   {id: 4, from:5000, to:10000, payload:[]},
  //   {id: 5, from:10000, to:null, payload:[]}
  // ]

  const [data, setData] = useState([]);
 
  const setRanges = (arr) => {
    setData(arr.map(el=> ({...el, payload:[]})))
  }
  
  const changeHandler = (e, rangeid, inputid) => {
   setData(prev=> {
     return prev.map(range => {
      if(range.id === rangeid) {
         const newPayload = range.payload.map(input => {
          if(input.id === inputid) {
            const newInput = {...input,[e.target.name]:e.target.value}
            return newInput
          } 
          else return input
        })
        return {...range, payload:newPayload}
      } 
      else return range
     })
   })
  }

  const addInput = (rangeid, inputid) => {
    setData(prev=>prev.map(range => {
      if(range.id === rangeid) {
        return {...range, payload:[...range.payload, {id: inputid, key:(range.to + inputid)}]}
      } else return range
  }))
}

const deleteInput = (rangeid, inputId) => {
  setData(prev=>prev.map(range => {
    if(range.id === rangeid) {
      return {...range, payload:range.payload.filter(e=>e.id!==inputId)}
    } else return range
}))
}

  return (
    <formContext.Provider value={{changeHandler, data, addInput, deleteInput, setRanges}}>
      {children}
    </formContext.Provider>
  )
}

export const useSentFormContext = () => useContext(formContext)
