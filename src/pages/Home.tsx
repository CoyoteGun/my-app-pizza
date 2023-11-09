import React, {useCallback, useEffect, useRef} from "react";
import {useSelector} from "react-redux";

import {Categories} from "../components/Categories";
import {SortPopup} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {selectPizzaData} from "../redux/pizza/selectors";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {fetchPizzas} from "../redux/pizza/asyncActions";

export const Home: React.FC = () => {

    const dispatch = useAppDispatch();

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);

    const isSearch = useRef(false);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page:number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
            category,
            sortBy,
            order,
            search,
            currentPage: String(currentPage),
        }));

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj:any) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <SortPopup value={sort}/>
            </div>
            <h2 className="content__title">Всі піци</h2>
            {status === 'error' ? (
                <div>
                    <h2>ПОМИЛКА!!! :(</h2>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};