import {
    isLoggedIn,
    logout
} from "./shared/utils/auth";

export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        },
        isLoggedIn: false,
        user: {}
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload); //removing the element into the array
        },
        setBasket(state, payload) {
            state.basket = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoggedIn(state, payload) {
            state.isLoggedIn = payload
        }
    },
    actions: {
        // sending last search data to state.lastSearch using this action call the setLastSearch mutation. && storing also the last search data to the local storage
        setLastSearch(context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },
        // stting last search if theres a stored data in local storage
        loadStoredState(context) {
            const lastSearch = localStorage.getItem('lastSearch');
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }

            const basket = localStorage.getItem('basket');
            if (basket) {
                context.commit('setBasket', JSON.parse(basket));
            }
        },
        addToBasket({ state, commit }, payload) {
            commit('addToBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        removeFromBasket({ state, commit }, payload) {
            commit('removeFromBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        clearBasket({ commit, state }, payload) {
            commit("setBasket", { items: [] });
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        async loadUser({ commit, dispatch }) {
            if (isLoggedIn()) {
                try {
                    const user = (await axios.get('/user')).data;
                    commit('setUser', user);
                    commit('setLoggedIn', true)
                } catch (error) {
                    dispatch('logout');
                }
            }
        },
        logout({ commit }) {
            commit('setUser', {});
            commit('setLoggedIn', false);
            logout();
        }

    },
    getters: {
        itemsInBasket: state => state.basket.items.length,
        inBasketAlready(state) { // method style getter
            return (id) => {
                return state.basket.items.reduce((result, item) => result || item.bookable.id === id, false);
            }
        }
    }
}