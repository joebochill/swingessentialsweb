import { GET_TIPS } from '../../actions/types';
import { TipsState } from '../../../__types__';

const initialState: TipsState = {
    tipList: [],
};
export const TipsReducer = (state = initialState, action: any): TipsState => {
    switch (action.type) {
        case GET_TIPS.SUCCESS:
            return {
                tipList: action.payload,
            };
        default:
            return state;
    }
};
