import { GET_PROS } from '../../actions/types';
import { ProsState } from '../../../__types__';

const initialState: ProsState = {
    prosList: [],
};
export const ProsReducer = (state = initialState, action: any): ProsState => {
    switch (action.type) {
        case GET_PROS.SUCCESS:
            return {
                prosList: action.payload,
            };
        default:
            return state;
    }
};
