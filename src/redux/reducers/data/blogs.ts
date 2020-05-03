import { GET_BLOGS } from '../../actions/types';
import { BlogsState } from '../../../__types__';

const initialState: BlogsState = {
    blogList: [],
};
export const BlogsReducer = (state = initialState, action: any): BlogsState => {
    switch (action.type) {
        case GET_BLOGS.REQUEST:
            return {
                ...state,
            };
        case GET_BLOGS.SUCCESS:
            return {
                blogList: action.payload,
            };
        default:
            return state;
    }
};
