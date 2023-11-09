import React from "react";
import {Link} from "react-router-dom";

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
    <div className="cart cart--empty">
        <h2>Кошик пустий <span>😕</span></h2>
        <p>
            Скоріш за все, ви не додали жодної піци.<br />
            Для того, щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt={'Empty Cart'} />
        <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
        </Link>
    </div>
);

export default CartEmpty;