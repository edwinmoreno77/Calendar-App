import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/register', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());


            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.message || 'Error en el registro'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const checkOutToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return dispatch(onLogout());
        }

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.removeItem('token');
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.removeItem('token');
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //properties
        status,
        user,
        errorMessage,

        //methods
        checkOutToken,
        startLogin,
        startRegister,
        startLogout,

    }
}