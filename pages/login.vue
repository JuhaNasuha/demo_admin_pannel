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
            <p class="_login_top_text">Login your account</p>
          </div>

          <div class="_login_form">
            <Form>
              <FormItem prop="user" :error="errorData.email">
                <Input size="large" type="text" v-model="formValue.email" placeholder="Email">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
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
              <p class="_forget">
                <router-link class="_1link" to="/forgetPassword">Forget password?</router-link>
              </p>
              <FormItem>
                <Button :loading="loading" class="_log_btn" @click="login">Sign In</Button>
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
            password: ''
        },
      errorData: {
            email: '',
            password: ''
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
            password: ''
        }
            if(!this.formValue.email   || this.formValue.email==null || this.formValue.email.trim()==''){
                return  this.errorData.email = "Email is required!!"
            }
              if(!this.formValue.password   || this.formValue.password==null || this.formValue.password.trim()==''){
                return  this.errorData.password = "Password is required!!"
            }
            this.loading = true;
                const res = await this.callApi("post", `auth/login`, this.formValue);
                if (res.status == 200) { 
                    this.$store.commit('setAuthUser', (res.data));
                    this.formValue = {
                        email: '',
                        password: ''
                    };
                    this.s("Great!", "You are Loged In!");
                    this.$router.push("/");
                    // window.location ='/'
                }
                else if (res.status == 422) {
                    if (res.data.msg) { 
                      this.e(res.data.msg);
                    }
                    this.$router.push("/login");
                }
                else if(res.status == 401){
                    if (res.data.msg) {
                       this.e(res.data.msg);
                    }
                    else{ 
                      if(res.data){
                      for (let item in res.data){
                           this.e(res.data[item].message)
                         }
                      }
                    }
                }
                else {
                  this.$router.push("/login");
                  this.e("Oops!", "Something went wrong, please try again!");
                }
              this.loading = false;
    }
  },
  async created(){
        if(this.isLoggedIn){
            this.$router.push('/') 
        }
    }
  
}
</script>