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
              <FormItem prop="password" :error="errorData.password">
                <Input
                  size="large"
                  type="password"
                  v-model="formValue.password"
                  placeholder="Password"
                >
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password" :error="errorData.confirmPassword">
                <Input
                  size="large"
                  type="password"
                  v-model="formValue.confirmPassword"
                  placeholder="Confirm Password"
                >
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password" :error="errorData.token">
                <Input
                  size="large"
                  type="text"
                  v-model="formValue.token"
                  placeholder="Token "
                >
                  <!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
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
          email:'',
           password: '',
            confirmPassword: '',
            token: '',
         },
      errorData: {
           password: '',
            confirmPassword: '',
            token: '',
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
            password: '',
            confirmPassword: '',
            token: '', 
         }
       
        if(!this.formValue.password   || this.formValue.password==null ||this.formValue.password.trim()==''){
                return  this.i ("Password is required!")
            }
        if (!this.formValue.confirmPassword) return this.i("Confirm Password can not be empty!");
        if(!this.formValue.token || this.formValue.token==null || this.formValue.token.trim()==''){
            return  this.errorData.token = "Token is required!!"
        }
        if (this.formValue.password != this.formValue.confirmPassword) return this.i("Password doesn't match!");
        this.isLoading = true
        const res = await this.callApi('post',`auth/password_reset`,this.formValue)
        if(res.status==200){
            this.errorData={
                password: '',
                confirmPassword: '',
                token: '',
            }
            this.s('New password set successfully.')
            this.formValue={}                    
            this.$store.commit('setAuthUser', (res.data));
            this.$router.push('/login') 
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
        this.formValue.email = this.$route.query.email
        console.log(this.formValue.email)
    }
  
}
</script>