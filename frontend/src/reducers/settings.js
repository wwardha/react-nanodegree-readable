import {SET_POST_SORT} from '../actions/index';

const initialSettingState = {
    sort: 'voteScore'
}

export const settings = (state=initialSettingState, action) => {
    const {sort} = action
    switch (action.type) {
        case SET_POST_SORT: 
            return {
                ...state,
                sort: sort
            }
        default: 
            return state;
    }
};