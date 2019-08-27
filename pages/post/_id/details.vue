<template>
  <div class="container">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <h3>{{post.title}}</h3>
          </span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editPost(post.id)"><i class="el-icon-edit"/></el-button> &nbsp; &nbsp;
          <el-button style="float: right; padding: 3px 0" type="text" @click="deletePost(post)"><i class="el-icon-delete"/></el-button>
        </div>
        <p>{{post.description}}</p>
      </el-card>
    </el-main>
  </div>

</template>
<script>
import { mapState } from 'vuex'

    export default {
        name: 'DetailList',
        async fetch({$axios, store, error, params}){
            try{
            const {data} = await $axios.get(`/posts/${params.id}`)
            store.dispatch('setPost', data);
            }catch(err){
                error({statusCode: 500, message: 'Ops, amna lou xew....'})
            }
        },
        computed: {
            ...mapState({
                post: state => state.post.singlePost
            })
        },
        methods: {
            editPost(postId) {
                this.$router.push({
                    path: `/post/${postId}/edit`
                })
            },
            deletePost(post){
                this.$store.dispatch('deletePost', post);
                this.$router.push({path: `/post/list`})
            }
        },
    }
</script>