import { GET_PACKAGES } from '../../actions/types';
import { PackagesState } from '../../../__types__';

const initialState: PackagesState = {
    list: [],
};
export const PackagesReducer = (state = initialState, action: any): PackagesState => {
    switch (action.type) {
        case GET_PACKAGES.SUCCESS:
            return {
                list: action.payload,
            };
        default:
            return state;
    }
};
