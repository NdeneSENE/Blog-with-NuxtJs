<template>
  <div class="container">
    <el-main>
      <el-card class="box-card" v-for="post in posts" :key="post.id" style="margin-bottom:10px">
        <div slot="header" class="clearfix">
          <span>
            <h3>{{post.title}}</h3>
          </span>
        </div>
        <p>{{post.description.substr(0, 90)}}...<el-button style="float: right; padding: 3px 0" type="text" @click="viewDetails(post.id)">Voir Details</el-button></p>
      </el-card>
    </el-main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        name: 'PostList',
        async fetch({store, $axios, error}){
            try{
                const {data} = await $axios.get('/posts');
                store.dispatch('setPosts', data);
            } catch(err){
                error({statusCode: 500, message: 'Ops, amna lou xew....'})
            }
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts
            })
        },
        methods: {
            viewDetails(postId) {
                this.$router.push({
                    path: `/post/${postId}/details`
                })
            }
        },
    }
</script>
