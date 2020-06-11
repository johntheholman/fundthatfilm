import React from 'react';


export default ({ label, meta:{touched, error}, input, type='text', placeholder, textarea}) => {
    return(
        <div>
            <input {...input} type={type} id={input.name} placeholder={input.Title} />

            <label htmlFor={ input.name }>{ label }</label>
            <p> { touched && error } </p>
      </div>
   );
 }
