import { useRef, useReducer, useEffect } from 'react';

export const useFetch = (url, method = 'GET', body = {}) => {

    const cache = useRef({});

    const initialState = {
        status: false,
        data: [],
        error: ''
    }

    const httpOptions = {
        method: method,
        body: body
    }

    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'LOADING':
                return { ...initialState, status: true }
            
            case 'SUCCESS':
                return { ...initialState, status: false, data: action.payload }
                
            case 'ERROR':
                return { ...initialState, status: false, error: action.payload }

            default:
                return state
        }
    }, initialState);

    useEffect(() => {
        if(!url || !url.trim()) return;

        const fetchData = async () => {
            dispatch({ type: 'LOADING' });
            if(cache.current[url]) {
                const data = cache.current[url];
                dispatch({ type: 'SUCCESS', payload: data });
            } else {
                try {
                    const response = await fetch(
                        url,
                        httpOptions
                    );
                    const data = await response.json();
                    cache.current[url] = data;
                    dispatch({ type: 'SUCCESS', payload: data });
                } catch(err) {
                    dispatch({ type: 'ERROR', payload: err.message })
                }
            }
        }
    }, [url]);

    return state;
    
}