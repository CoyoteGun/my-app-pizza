import React from "react";

type CategoriesProps = {
    value: number;
    onChangeCategory: (i: number) => void;
};
const categories = ["Всі", "М'ясна", "Веганська", "Гриль", "Гостра", "Закрита"];

export const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

    return (
            <div className="categories">
                <ul>
                    {categories.map((categoryName, i) => (
                        <li
                            key={i}
                            onClick={() => onChangeCategory(i)}
                            className={value === i ? 'active' : ''}>{categoryName}</li>
                    ) )}
                </ul>
            </div>
    );
};
