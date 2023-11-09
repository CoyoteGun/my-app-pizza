import {Categories} from "../components/Categories";
import {Sort, sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

import React, {useEffect, useRef} from "react";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from "qs";
import {Link, useNavigate} from "react-router-dom";

import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

export const Home: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const onChangePage = (page:number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            // @ts-ignore
            fetchPizzas({
            category,
            sortBy,
            order,
            search,
            currentPage,
        }));

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj:any) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
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