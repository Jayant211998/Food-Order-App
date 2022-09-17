import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = (props) =>{

const [isCheckOut,setIsCheckOut] = useState(false);    
const [isSubmiting,setIsSubmiting] = useState(false);
const [didSubmiting,setDidSubmiting] = useState(false);
const cartCtx = useContext(CartContext);

const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
const hasItems = cartCtx.items.length>0;

const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
};

const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
};

const orderHandler=(e)=>{
    setIsCheckOut(true);
}

const submitOrderHandler = async(userData) => {
    setIsSubmiting(true);
    const res = await axios.post('https://food-order-app-433bf-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            user: userData,
            orderedItems: cartCtx.items
    })
    setIsSubmiting(false);
    setDidSubmiting(true);
    cartCtx.clearCart();

}


const cartItems = (<ul className={classes['cart-items']}>
                    {
                        cartCtx.items.map((item) =>{
                            return <CartItem
                                key={item.id}
                                name={item.name}
                                amount={item.amount}
                                price={item.price}
                                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                onAdd={cartItemAddHandler.bind(null, item)}
                            />
                        })
                    }
                </ul>);
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={(e)=>{orderHandler(e);}}>Order</button>}
        </div>
        );

    const cartModalContent = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckOut && modalActions}
    </React.Fragment>
    const isSubmittingModalContent = <p>Sending Order Data...</p>

    const didSubmitModalCotent = <React.Fragment >
        <p>Successfully Sent The Order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>Close</button>
        </div>
 
        </React.Fragment>
    return(
        <Modal onHideCart={props.onHideCart}>
            {!isSubmiting&& !didSubmiting && cartModalContent}
            {isSubmiting && isSubmittingModalContent}
            {!isSubmiting && didSubmiting && didSubmitModalCotent}
        </Modal>
    );
}

export default Cart;