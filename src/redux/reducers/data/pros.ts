import { GET_PROS } from '../../actions/types';
import { ProsState } from '../../../__types__';

const initialState: ProsState = {
    loading: false,
    prosList: [],
};
export const ProsReducer = (state = initialState, action: any): ProsState => {
    switch (action.type) {
        case GET_PROS.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PROS.SUCCESS:
            return {
                loading: false,
                prosList: action.payload,
            };
        case GET_PROS.FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
