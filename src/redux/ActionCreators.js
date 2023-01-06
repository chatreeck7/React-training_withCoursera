import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl'; //to communicate with server


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

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT, //this is a action.type for awitch case to modify mutate current state
    payload: comment
});

//this is a example of redux thunk
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment 
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment),
        credentials: "same-origin"
    })
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
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('post comments', error.message); 
            alert(`Your comment could not be posted\nError: ${error.message}`);
    });
} 
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