import { GET_TESTIMONIALS } from '../../actions/types';
import { TestimonialsState } from '../../../__types__';

const initialState: TestimonialsState = {
    list: [],
};
export const TestimonialsReducer = (state = initialState, action: any): TestimonialsState => {
    switch (action.type) {
        case GET_TESTIMONIALS.SUCCESS:
            return {
                list: action.payload,
            };
        default:
            return state;
    }
};
