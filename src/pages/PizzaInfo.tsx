import {useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const PizzaInfo: React.FC = () => {

    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://6543c99601b5e279de20f63f.mockapi.io/items/' + id);
                setPizza(data);
            }catch (e) {
                alert('fail');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>LOAD!!!</>;
    }

    return (
        <div className={"container"}>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};