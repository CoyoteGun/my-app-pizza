import {Route, Routes} from "react-router-dom";

import './scss/app.scss';

import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {NotFoundBlock} from "./components/NotFoundBlock";
import {Cart} from "./pages/Cart";
import {PizzaInfo} from "./pages/PizzaInfo";

function App() {
    return (
        <div className="wrapper">
               <Header />
               <div className="content">
                   <Routes>
                       <Route path={"/"} element={<Home />} />
                       <Route path={"/cart"} element={<Cart />} />
                       <Route path={"/pizza/:id"} element={<PizzaInfo />} />
                       <Route path={"*"} element={<NotFoundBlock />} />
                   </Routes>
               </div>
        </div>
    );
}

export {App};
