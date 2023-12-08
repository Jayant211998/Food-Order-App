import classes from './Checkout.module.css';
import { useRef, useState } from 'react';


const Checkout = (props) => {
    const [formInputValidity,setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (value) => value==='';
    const isFiveChar = (value) => value.length===5; 

    const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        setFormInputValidity({
            name:!isEmpty(enteredName),
            street:!isEmpty(enteredStreet),
            city:!isEmpty(enteredCity),
            postalCode:!isFiveChar(enteredPostalCode)
        })
        const isFormValid = !isEmpty(enteredName) && !isEmpty(enteredStreet) && !isEmpty(enteredCity) && !isFiveChar(enteredPostalCode);
        if(!isFormValid){
            return;
        }
        
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCode,
            city:enteredCity
        });
        
    };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter a Valid Name</p> }
      </div>
      <div className={`${classes.control} ${formInputValidity.street?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please Enter a Valid street</p> }
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Please Enter a Valid Postal Code.</p> }

      </div>
      <div className={`${classes.control} ${formInputValidity.city?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.name && <p>Please Enter a Valid </p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;