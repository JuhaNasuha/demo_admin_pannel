<template>
  <div>
    <div class="_login">
      <div class="_login_left">
        <div class="_login_overlay"></div>

        <div class="authentic_nav_logo">
          <a href class="authentic_nav_logo_a">
            <img src="/../img/logo-icon.png" alt title class="_navbar_logo_img" />
            <img src="/../img/logo-text.png" alt title class="_navbar_logo_img_text" />
          </a>
        </div>

        <p
          class="_login_left_text"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tellus elit.</p>

        <Button type="primary">Learn More</Button>
      </div>

      <div class="_login_right">
        <div class="_login_main">
          <div class="_login_top _1border_color">
            <p class="_login_top_text">Please Enter your email</p>
          </div>

          <div class="_login_form">
            <Form>
              <FormItem prop="user" :error="errorData.email">
                <Input size="large" type="text" v-model="formValue.email" placeholder="Email">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
               
              <p class="_forget">
                <router-link class="_1link" to="/login">Remembered password?</router-link>
              </p>
              <FormItem>
                <Button :loading="loading" class="_log_btn" @click="login">Submit</Button>
              </FormItem>
            </Form>
          </div>

          <!-- <div class="_login_bottom">
            <p class="_login_do">
              Don't have Account?
              <router-link class="_3link _mar_l5" to="/register">Register Now</router-link>
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      formValue: {
            email: '',
         },
      errorData: {
            email: '',
         },
        loading:false,
    } 
  },
  computed: {
        ...mapGetters([
        'isLoggedIn',
        'getAuthUser',
        ])
    },
  methods:{
    async login() {
        this.errorData={
            email: '',
         }
        if(!this.formValue.email || this.formValue.email==null || this.formValue.email.trim()==''){
            return  this.errorData.email = "Email is required!!"
        }
        this.isLoading = true
        const res = await this.callApi('post',`auth/send_resetLink`,this.formValue)
        if(res.status==200){
            this.errorData={
                email: '',
            }
            this.s('Check your inbox.')
            this.$router.push(`/reset_pass?email=${this.formValue.email}`) 
            this.formValue={}
        }
        else if(res.status===401){ 
            if(res.data.message){
                this.w(res.data.message);
            }  
        }
        else{
            this.swr();
        }
        this.isLoading = false
    }
  },
   async created(){
        if(this.isLoggedIn){
            this.$router.push('/') 
        }
    }
  
}
</script>