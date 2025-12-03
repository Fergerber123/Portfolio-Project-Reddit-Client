import React from "react";
import '../styles/filter.css'
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/postsSlice";


export default function Filter() {

    const dispatch = useDispatch()

    const handleClickHot = () => {
        dispatch(setFilter('hot'))
        document.getElementById('hot').classList.add('active')
        document.getElementById('best').classList.remove('active')
        document.getElementById('new').classList.remove('active')
    }

    const handleClickBest = () => {
        dispatch(setFilter('best'))
        document.getElementById('best').classList.add('active')
        document.getElementById('hot').classList.remove('active')
        document.getElementById('new').classList.remove('active')
    }

    const handleClickNew = () => {
        dispatch(setFilter('new'))
        document.getElementById('new').classList.add('active')
        document.getElementById('best').classList.remove('active')
        document.getElementById('hot').classList.remove('active')
    }

    return (
        <div className="filter">
            <div className="filter-text">
                <p>Filter by:</p>
            </div>
            <div className="containter">
                <div className="card" id='hot' onClick={handleClickHot}>
                    <img src="/hot-icon.png"></img>
                    <p>Hot</p>
                </div>
                <div className="card" id='best' onClick={handleClickBest}>
                    <img src="/best-icon.png"></img>
                    <p>Best</p>
                </div>
                <div className="card" id='new' onClick={handleClickNew}>
                    <img src="/new-icon.png"></img>
                    <p>New</p>
                </div>
            </div>
        </div>
    )
}