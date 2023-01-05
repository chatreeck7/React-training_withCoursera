import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT, //this is a action.type for awitch case to modify mutate current state
    payload: { //this is data carrier to reducer function
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});