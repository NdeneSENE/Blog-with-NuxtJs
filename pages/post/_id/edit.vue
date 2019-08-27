<template>
  <div class="container">
    <el-main>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="Titre" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">Modifier</el-button>
          <el-button @click="resetForm('form')">Annuler</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
name: 'EditPost',
async fetch({$axios, store, params, error}){
    try{
    const {data} = await $axios.get(`/posts/${params.id}`);
    store.dispatch('setPost', data)
    } catch(err){
        error({statusCode: 500, message: 'Ops, amna lou xew....'})
    }
    
},
data(){
  return {
    form: {
    title: '',
    description: ''
    },
    rules: {
      title:  { required: true, message: 'SVP renseignez le champ titre', trigger: 'blur' },
      description:  { required: true, message: 'SVP renseignez le champ description', trigger: 'blur' },
    }
  }
},
created () {
    this.form.title = this.post.title;
    this.form.description = this.post.description
},
computed: {
    ...mapState({
        post: state => state.post.singlePost
    })
},
methods:{
  onSubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('updatePost', {
              id: this.post.id,
              title: this.form.title,
              description: this.form.description
            });
            this.$router.push({path : '/post/list'})
          } else {
            console.log('erreur post!!');
            return false;
          }
        });
  },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
}
}
</script>

<style>
</style>
