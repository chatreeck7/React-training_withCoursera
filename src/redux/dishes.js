import * as ActionTypes from './ActionTypes'

export const Dishes = ( state = {
    isLoading: true,
    errMess: null,
    dishes: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false, errMess:null, dishes: action.payload};
 

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading:true, errMess:null, dishes: []};
            // ES6 syntax to apply this modification to the state 
            // to send a "new" state from "current" state, not mutate current state

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading:false, errMess:action.payload, dishes: []};

        default:
            return state;
    }
};