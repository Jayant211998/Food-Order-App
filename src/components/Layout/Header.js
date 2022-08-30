import React from 'react';
import mealsimage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css'



const Header = (props) =>{
    return (
        <React.Fragment>
            <header className = {classes.header}>
                <h2>My Meals</h2>
                <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            <div className = {classes['main-image']}>
                <img src={mealsimage} alt="food"/>
            </div>
        </React.Fragment>
    )
}
export default Header;