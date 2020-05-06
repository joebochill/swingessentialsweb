import { APIStatusState, APIStatus } from '../../../__types__';
import {
    INITIAL_LOAD,
    LOGIN,
    REFRESH_TOKEN,
    CREATE_ACCOUNT,
    SET_TOKEN,
    UPDATE_USER_CREDENTIALS,
    RESET_USER_PASSWORD,
    LOGOUT,
    TOKEN_TIMEOUT,
    RESET_API_STATUS,
    GET_BLOGS,
    CHANGE_PASSWORD,
    CHECK_EMAIL,
    CHECK_USERNAME,
    VERIFY_RESET_PASSWORD_CODE,
    GET_USER_DATA,
    GET_LESSONS,
    GET_USERS,
    GET_PROS,
    REDEEM_LESSON,
    GET_TIPS,
    SET_USER_DATA,
    VALIDATE_PASSWORD,
    VERIFY_EMAIL,
} from '../../actions/types';

const starterState: APIStatus = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: null,
};
const starterCheckState: APIStatus = {
    initialized: false,
    requestStatus: 'initial',
    message: '',
    code: null,
    extra: {
        available: false,
    },
};
const initialAppState: APIStatusState = {
    authentication: {
        initialized: false,
        requestStatus: 'initial',
        message: '',
        code: null,
        extra: {
            failures: 0,
        },
    },
    blogs: starterState,
    changePassword: starterState,
    checkEmail: starterCheckState,
    checkUsername: starterCheckState,
    createAccount: starterState,
    getUserData: starterState,
    loadLessons: starterState,
    loadUsers: starterState,
    pros: starterState,
    redeemLessons: starterState,
    resetPassword: starterState,
    tips: starterState,
    updateUserData: starterState,
    validatePassword: starterState,
    verifyEmail: starterState,
    verifyReset: starterState,
};

export const APIReducer = (state = initialAppState, action: any): APIStatusState => {
    switch (action.type) {
        /* Authentication */
        case INITIAL_LOAD:
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    initialized: true,
                },
            };
        case LOGIN.REQUEST:
        case REFRESH_TOKEN.REQUEST: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                },
            };
        }
        case LOGIN.SUCCESS:
        case SET_TOKEN.REQUEST:
        case REFRESH_TOKEN.SUCCESS:
        case UPDATE_USER_CREDENTIALS.SUCCESS: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        failures: 0,
                    },
                },
            };
        }

        case LOGIN.FAILURE: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: {
                        failures: state.authentication.extra.failures + 1,
                    },
                },
            };
        }
        case REFRESH_TOKEN.FAILURE: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                },
            };
        }
        case LOGOUT.SUCCESS:
        case LOGOUT.FAILURE:
        case TOKEN_TIMEOUT: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: {
                        failures: 0,
                    },
                },
                blogs: starterState,
                loadLessons: starterState,
                redeemLessons: starterState,
                tips: starterState,
            };
        }
        case RESET_API_STATUS.LOGIN_FAILURES:
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    extra: {
                        failures: 0,
                    },
                },
            };

        /* Blogs */
        case GET_BLOGS.REQUEST:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case GET_BLOGS.SUCCESS:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_BLOGS.FAILURE:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Change Password */
        case CHANGE_PASSWORD.REQUEST:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case CHANGE_PASSWORD.SUCCESS:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case CHANGE_PASSWORD.FAILURE: {
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        }
        case RESET_API_STATUS.CHANGE_PASSWORD:
            return {
                ...state,
                changePassword: starterState,
                validatePassword: starterState,
            };

        /* Check Email */
        case CHECK_EMAIL.REQUEST:
            return {
                ...state,
                checkEmail: {
                    ...state.checkEmail,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: {
                        available: false,
                    },
                },
            };

        case CHECK_EMAIL.SUCCESS:
            return {
                ...state,
                checkEmail: {
                    ...state.checkEmail,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        available: action.payload.available,
                    },
                },
            };
        case CHECK_EMAIL.FAILURE: {
            return {
                ...state,
                checkEmail: {
                    ...state.checkEmail,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: {
                        available: false,
                    },
                },
            };
        }
        case RESET_API_STATUS.REGISTRATION_CHECKS:
            return {
                ...state,
                checkEmail: starterCheckState,
                checkUsername: starterCheckState,
            };

        /* Check Username */
        case CHECK_USERNAME.REQUEST:
            return {
                ...state,
                checkUsername: {
                    ...state.checkUsername,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: {
                        available: false,
                    },
                },
            };

        case CHECK_USERNAME.SUCCESS:
            return {
                ...state,
                checkUsername: {
                    ...state.checkUsername,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        available: action.payload.available,
                    },
                },
            };

        case CHECK_USERNAME.FAILURE: {
            return {
                ...state,
                checkUsername: {
                    ...state.checkUsername,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: {
                        available: false,
                    },
                },
            };
        }

        /* Create Account */
        case CREATE_ACCOUNT.REQUEST:
            return {
                ...state,
                createAccount: {
                    ...state.createAccount,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case CREATE_ACCOUNT.SUCCESS:
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        failures: 0,
                    },
                },
                createAccount: {
                    ...state.createAccount,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case CREATE_ACCOUNT.FAILURE: {
            return {
                ...state,
                createAccount: {
                    ...state.createAccount,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        }

        /* Get User Data */
        case GET_USER_DATA.REQUEST:
            return {
                ...state,
                getUserData: {
                    ...state.getUserData,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case GET_USER_DATA.SUCCESS:
            return {
                ...state,
                getUserData: {
                    ...state.getUserData,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_USER_DATA.FAILURE:
            return {
                ...state,
                getUserData: {
                    ...state.getUserData,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Load Lessons */
        case GET_LESSONS.REQUEST:
            return {
                ...state,
                loadLessons: {
                    ...state.loadLessons,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_LESSONS.SUCCESS:
            return {
                ...state,
                loadLessons: {
                    ...state.loadLessons,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_LESSONS.FAILURE:
            return {
                ...state,
                loadLessons: {
                    ...state.loadLessons,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Load Users */
        case GET_USERS.REQUEST:
            return {
                ...state,
                loadUsers: {
                    ...state.loadUsers,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case GET_USERS.SUCCESS:
            return {
                ...state,
                loadUsers: {
                    ...state.loadUsers,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_USERS.FAILURE: {
            return {
                ...state,
                loadUsers: {
                    ...state.loadUsers,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        }

        /* Pros */
        case GET_PROS.REQUEST:
            return {
                ...state,
                pros: {
                    ...state.pros,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_PROS.SUCCESS:
            return {
                ...state,
                pros: {
                    ...state.pros,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_PROS.FAILURE:
            return {
                ...state,
                pros: {
                    ...state.pros,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Redeem Lessons */
        case REDEEM_LESSON.REQUEST:
            return {
                ...state,
                redeemLessons: {
                    ...state.redeemLessons,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case REDEEM_LESSON.SUCCESS:
            return {
                ...state,
                redeemLessons: {
                    ...state.redeemLessons,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case REDEEM_LESSON.FAILURE:
            return {
                ...state,
                redeemLessons: {
                    ...state.redeemLessons,
                    requestStatus: 'failed',
                    message: '',
                    code: parseInt(action.error, 10),
                    extra: null,
                },
            };

        /* Reset Password */
        case RESET_USER_PASSWORD.REQUEST:
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        failures: 0,
                    },
                },
                resetPassword: {
                    ...state.resetPassword,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case RESET_USER_PASSWORD.SUCCESS:
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case RESET_USER_PASSWORD.FAILURE: {
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        }

        /* Tips */
        case GET_TIPS.REQUEST:
            return {
                ...state,
                tips: {
                    ...state.tips,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case GET_TIPS.SUCCESS:
            return {
                ...state,
                tips: {
                    ...state.tips,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case GET_TIPS.FAILURE:
            return {
                ...state,
                tips: {
                    ...state.tips,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Update User Data */
        case SET_USER_DATA.REQUEST:
            return {
                ...state,
                updateUserData: {
                    ...state.updateUserData,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case SET_USER_DATA.SUCCESS:
            return {
                ...state,
                updateUserData: {
                    ...state.updateUserData,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case SET_USER_DATA.FAILURE: {
            return {
                ...state,
                updateUserData: {
                    ...state.updateUserData,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        }
        case RESET_API_STATUS.USER_DATA:
            return {
                ...state,
                updateUserData: {
                    ...state.updateUserData,
                    requestStatus: 'initial',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        /* Validate Password */
        case VALIDATE_PASSWORD.REQUEST:
            return {
                ...state,
                validatePassword: {
                    ...state.validatePassword,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: {
                        currentValid: 'loading',
                    },
                },
            };
        case VALIDATE_PASSWORD.SUCCESS:
            return {
                ...state,
                validatePassword: {
                    ...state.validatePassword,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        currentValid: 'success',
                    },
                },
            };
        case VALIDATE_PASSWORD.FAILURE:
            return {
                ...state,
                validatePassword: {
                    ...state.validatePassword,
                    requestStatus: 'failed',
                    message: '',
                    code: null,
                    extra: {
                        currentValid: 'failed',
                    },
                },
            };

        /* Verify Email */
        case VERIFY_EMAIL.REQUEST:
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case VERIFY_EMAIL.SUCCESS:
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: null,
                },
            };
        case VERIFY_EMAIL.FAILURE: {
            const error = parseInt(action.error, 10);
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    requestStatus: 'failed',
                    message: '',
                    code: isNaN(error) ? -1 : error,
                    extra: null,
                },
            };
        }

        /* Verify Reset */
        case VERIFY_RESET_PASSWORD_CODE.REQUEST:
            return {
                ...state,
                verifyReset: {
                    ...state.verifyReset,
                    requestStatus: 'loading',
                    message: '',
                    code: null,
                    extra: null,
                },
            };

        case VERIFY_RESET_PASSWORD_CODE.SUCCESS:
            return {
                ...state,
                verifyReset: {
                    ...state.verifyReset,
                    requestStatus: 'success',
                    message: '',
                    code: null,
                    extra: {
                        resetUser: action.payload.username,
                        resetToken: action.payload.auth,
                    },
                },
            };
        case VERIFY_RESET_PASSWORD_CODE.FAILURE: {
            const errorCode = parseInt(action.error, 10); //TODO check if this should be from the payload
            return {
                ...state,
                verifyReset: {
                    ...state.verifyReset,
                    requestStatus: 'failed',
                    message: '',
                    code: isNaN(errorCode) ? -1 : errorCode,
                    extra: null,
                },
            };
        }

        default:
            return state;
    }
};
