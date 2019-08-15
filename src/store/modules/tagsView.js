import path from 'path'

export default {
    state: {
        tagsView:[]
    },
    mutations: {
        SET_TAGS_VIEW(state, views) {
            state.tagsView = [...views];
        },
        ADD_TAGS_VIEW(state, view) {
            if(view.name && view.meta && !view.meta.hidden) {
                if(state.tagsView.some(v => v.path === view.path)) return
                state.tagsView.push({...view});
            }
        },
        CLOSE_TAGS_VIEW(state, view) {
            let index = state.tagsView.findIndex(v => v.path === view.path)
            state.tagsView.splice(index, 1)
        } 
    },
    actions: {
        closeTagsView({state, commit}, view) {
            return new Promise(resolve => {
                commit('CLOSE_TAGS_VIEW', view);
                resolve([...state.tagsView])
            })
        }
    }
}