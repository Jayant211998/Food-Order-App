import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
// import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) =>{
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    // const cartCtx = useContext(CartContext);
    const cartItems = useSelector(state=>state.cart.items);
    const numberOfCartItems = cartItems.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(cartItems.length === 0){
            return ; 
        }
        setBtnIsHighlighted(true);
        setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);
    },[cartItems])
     
    return (
        <button className={btnClasses} onClick = {props.onShowCart}>
            <span className={classes.icon}> <CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )

}
export default HeaderCartButton;