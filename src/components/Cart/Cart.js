import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import React, { useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { submitOrderAction } from '../../store/user';
// import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) =>{

const [isCheckOut,setIsCheckOut] = useState(false);    
const [isSubmiting,setIsSubmiting] = useState(false);
const [didSubmiting,setDidSubmiting] = useState(false);

// const cartCtx = useContext(CartContext);
const dispatch = useDispatch();
const cart = useSelector(state=>state.cart);


const totalAmount = `$${cart.totalAmount.toFixed(2)}`;
const hasItems = cart.items.length>0;

const cartItemRemoveHandler = (id) => {
    // cartCtx.removeItem(id);
    dispatch(cartActions.removeItem(id));
};

const cartItemAddHandler = (item) => {
    // cartCtx.addItem({...item,amount:1});
    dispatch(cartActions.addItem({...item,amount:1}));
};

const orderHandler=(e)=>{
    setIsCheckOut(true);
}

const submitOrderHandler = async(userData) => {

    setIsSubmiting(true);

    submitOrderAction(userData, cart)(dispatch);
    
    setIsSubmiting(false);
    setDidSubmiting(true);
    // cartCtx.clearCart();
}


const cartItems = (<ul className={classes['cart-items']}>
                    {
                        cart.items.map((item) =>{
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