import React from 'react'

const  Alert=(props)=> {
    const Upper = (word) => {
      if(word === "danger"){
        word = "error";
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <span style={{height : '50px'}}>
            {props.alert &&
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{Upper(props.alert.type)}</strong> : {Upper(props.alert.msg)}
            </div>}
        </span>
    )
}

export default Alert
