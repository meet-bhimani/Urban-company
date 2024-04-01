import {
	FETCH_PRODUCTS_FAILURE,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
} from "../actions/productActions"

const initialState = {
	products: [],
	loading: true,
	error: "",
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true,
				error: "",
			}

		case FETCH_PRODUCTS_SUCCESS:
			return {
				loading: false,
				error: "",
				products: action.payload,
			}

		case FETCH_PRODUCTS_FAILURE:
			return {
				loading: false,
				error: action.payload,
				products: [],
			}

		default:
			return state
	}
}
