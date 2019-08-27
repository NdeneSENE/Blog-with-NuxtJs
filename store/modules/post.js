const state = () =>({
    posts: [],
    singlePost: {}
})

const getters = {

}

const mutations = {
    SET_POSTS(state, payload){
        state.posts = payload
    },
    SET_POST(state, payload){
        state.singlePost = Object.assign({}, state.singlePost, payload)
    },
    ADD_POST(state, payload){
        state.posts.push(payload)
    },
    UPDATE_POST(state, payload){
        const index = state.posts.findIndex(p => p.id ===payload.id)
        state.posts[index].title = payload.title;
        state.posts[index].description = payload.description;
    },
    DELETE_POST(state, payload){
        const index = state.posts.findIndex(p => p.id === payload)
        state.posts.splice(index, 1)
    }
}

const actions = {
    setPosts({ commit }, payload){
        commit('SET_POSTS', payload)
    },
    setPost({ commit }, payload){
        commit('SET_POST', payload)
    },
    async addPost({ commit }, payload) {
        const { data } = await this.$axios.post('/posts', payload)
        commit('ADD_POST', data)
    },
    async updatePost({commit}, payload){
        const {data} = await this.$axios.patch(`/posts/${payload.id}`, payload)
        commit('UPDATE_POST', data)
    },
    async deletePost({commit}, payload){
        const {data} = await this.$axios.delete(`/posts/${payload.id}`, payload)
        commit('DELETE_POST', data)
    }
}

const postModule = {
    state,
    getters,
    mutations,
    actions
}

export default postModule