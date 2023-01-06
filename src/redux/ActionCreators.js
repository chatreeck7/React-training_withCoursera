import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl'; //to communicate with server

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT, //this is a action.type for awitch case to modify mutate current state
    payload: { //this is data carrier to reducer function
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
// ---- Dishes action creator BEGIN ---- 
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
    // handling the error when response isn't ok
    .then(response => {
        if (response.ok){
            return response;
        }
        else {
            var error = new Error(`Error ${response.status} : ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes 
});
// ---- Dishes action creator END ----

// ---- Comments action creator BEGIN ----
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    // handling the error when response isn't ok
    .then(response => {
        if (response.ok){
            return response;
        }
        else {
            var error = new Error(`Error ${response.status} : ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
// ---- Comments action creator END ----

// ---- Promos action creator BEGIN ----
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    // handling the error when response isn't ok
    .then(response => {
        if (response.ok){
            return response;
        }
        else {
            var error = new Error(`Error ${response.status} : ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
// ---- Promos action creator END ----