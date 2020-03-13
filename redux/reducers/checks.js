import {checksAPI} from "../../api/api";
import React from "react";

const SET_CHECKBOXES = 'checkboxes/SET_CHECKBOXES';
const SET_CHECKBOX = 'checkboxes/SET_CHECKBOX';
const DELETE_CHECKBOX = 'checkboxes/DELETE_CHECKBOX';
const SET_CURRENT_PAGE = 'checkboxes/SET_CURRENT_PAGE';
const SET_TOTAL_CHECKBOX_COUNT = 'checkboxes/SET_TOTAL_CHECKBOX_COUNT';
const TOGGLE_IS_FETCHING = 'checkboxes/TOGGLE_IS_FETCHING';
const TOGGLE_CHECKBOX_VALUE = 'checkboxes/TOGGLE_CHECKBOX_VALUE';
const TOGGLE_IS_PLACES_UPDATING = 'checkboxes/TOGGLE_IS_PLACES_UPDATING';

let initialState = {
    checkboxes: [],
    pageSize: 10,
    totalCheckboxesCount: 0,
    currentPage: 1,
    checkbox: {
        _id: null,
        title: null,
        value: null
    },
    isFetching: false,
    isPlacesUpdating: []
};

const checksReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_CHECKBOX_VALUE:
            return {
                ...state,
                checkboxes: state.checkboxes.map(s => {
                    if (s._id === action.id) {
                        if(s.value === true) {
                            return {...s, value: false}
                        } else {
                            return {...s, value: true}
                        }
                    }
                    return s;
                })
            };
        case SET_CHECKBOXES:
            return {
                ...state, checkboxes: action.checkboxes
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case SET_TOTAL_CHECKBOX_COUNT:
            return {
                ...state, totalPlacesCount: action.totalPlacesCount
            };
        default:
            return state;
    }
};

export const setCheckboxes = (checkboxes) => {return {type: SET_CHECKBOXES, checkboxes}}; /*добавляем чекбоксы в стэйт*/
/*export const setPlace = (place) => {return {type: SET_PLACE, place}};
export const setCurrentPage = (currentPage) => {return {type: SET_CURRENT_PAGE, currentPage}};*/
export const setTotalCheckboxesCount = (totalCheckboxesCount) => {return {type: SET_TOTAL_CHECKBOX_COUNT, totalCheckboxesCount}}; /*пишем в стэйт общее кол-во чекбоксов (полученных с апи)*/
export const toggleCheckboxesValue = (id) => {return {type: TOGGLE_CHECKBOX_VALUE, id}}; /*снимаем/ставим флаг о состоянии чекбокса (юзаем при клике на чб)*/
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching}};
/*export const toggleIsPlacesUpdating = (isFetching, id) => {return {type: TOGGLE_IS_PLACES_UPDATING, isFetching, id}};
export const deletePlaceAC = (id) => {  return {type: DELETE_PLACE, id}};*/

/*используем для получения всех чекбоксов через апи и вызываем экшн криэйтор для записи их в стэйт*/
export const getCheckboxesThunk = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true)); /*это нужно для отображения индикатора загрузки, пока не юзаем*/
    let data = await checksAPI.getCheckboxes(currentPage, pageSize); /*делаем запрос на сервер и получаем список чекбоксов*/
    console.log(data); /*выводим в консоль, что получилось*/
    if (data.resultCode === 0) {
        dispatch(setCheckboxes(data.checkboxes)); /*диспатчим АС, пишем полученные чекбоксы в стэйт*/
        dispatch(setTotalCheckboxesCount(data.count)); /*пишем общее кол-во в стэйт*/
        dispatch(toggleIsFetching(false))
    } else {
      /*  dispatch(setAuthFalse());*/
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
           /* localStorage.removeItem('userData');
            return <Redirect to={'/login'} />*/
           console.log('Auth err')
        }
    }

};
/*

export const getPlace = (id) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await placesAPI.getPlace(id);

    if (data.resultCode === 0) {
        dispatch(setPlace(data.item));
        dispatch(toggleIsFetching(false));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsFetching(false));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const putPlaceActive = (id, place, active) => async (dispatch) => {

    dispatch(toggleIsPlacesUpdating(true, id));

    let data = await placesAPI.putPlaceActive(id, place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка обновлена', 'success');
        dispatch(toggleIsPlacesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка получения данных', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsPlacesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

    active ? dispatch(activePlaceOff(id)) : dispatch(activePlaceOn(id));

};

export const putPlace = (id, place) => async (dispatch) => {

    dispatch(toggleIsPlacesUpdating(true, id));

    let data = await placesAPI.putPlace(id, place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка обновлена', 'success');
        dispatch(toggleIsPlacesUpdating(false, id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        dispatch(toggleIsPlacesUpdating(false, id));
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};


export const createPlace = (place) => async (dispatch) => {

    let data = await placesAPI.createPlace(place);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка добавлена', 'success');
        dispatch(setPlace(place));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};

export const deletePlace = (id) => async (dispatch) => {

    let data = await placesAPI.deletePlace(id);

    if (data.resultCode === 0) {
        Notify('TVAPP', 'Точка удалена', 'success');
        dispatch(deletePlaceAC(id));
    } else {
        Notify('TVAPP', 'Ошибка', 'danger');
        dispatch(setAuthFalse());
        if(data.resultCode === 10){
            localStorage.removeItem('userData');
            return <Redirect to={'/login'} />
        }
    }

};
*/


export default checksReducer;