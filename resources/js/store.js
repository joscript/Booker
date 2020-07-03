export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        }
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
        }
    },
    getters: {
        itemsInBasket: state => state.basket.items.length,
        inBasketAlready(state) { // metho style getter
            return (id) => {
                return state.basket.items.reduce((result, item) => result || item.bookable.id === id, false);
            }
        }
    }
}
