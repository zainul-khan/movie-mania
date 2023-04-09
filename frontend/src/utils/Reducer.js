import React from 'react'


export const initialState = false;

export const Reducer = (state, action) => {
  if(action.type==="USER"){
    return action.payload
  }
  return state;
}