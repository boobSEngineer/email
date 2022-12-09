import React, {useEffect} from "react";
import {Route, Routes, useLocation, useParams} from "react-router-dom";

import {LayoutEmail} from "./Layout/LayoutEmail";

import FilterLetters from "./Component/Letter/FilterLetters";
import {PageWrapper} from "./Component/Letter/PageWrapper";

const App: React.FC = () => {

    let linkSplit = useLocation().pathname.split('/');
    let linkType = linkSplit.length !== 0 ? linkSplit[1] : "";

    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutEmail/>}>
                    <Route index element={<div>привет</div>}/>
                    <Route path={`${linkType}`} element={<FilterLetters linkType={linkType}/>}/>
                    <Route path={`${linkType}/:id`} element={<PageWrapper linkType={linkType}/>}/>
                </Route>
            </Routes>

        </>
    )
};

export {App};


