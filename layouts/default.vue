<template>
	<div id="app">
    <div :class="darkMode? 'darkMode' : ''" id="main-wrapper">
      <!-- Menu --> 
      <nav v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/reset_pass' && $route.path != '/forgetPassword'" :class="sidebar? '_navbar _fixed_top _navbar_light _navbar_wap _mini_navbar' : '_navbar _fixed_top _navbar_light _navbar_wap'">
        <div class="_navbar_left">
          <div class="_navbar_logo">
            <a href="" class="_navbar_logo_link">
              <!-- <img class="_navbar_logo_img" src="/img/logo-icon.png" alt="" title=""> -->
              <img class="_navbar_logo_img_text" src="/../img/logo-text.png" alt="" title="">
            </a>
          </div>
 
          <div class="_navbar_left_button">
            <div @click="sidebar = !sidebar" class="_navbar_left_icon">
              <Icon type="md-list" />
            </div>

            <div @click="mobSidebar = !mobSidebar" class="_navbar_left_icon _mob_icon">
              <Icon type="md-list" />
            </div>
          </div>

          <!-- <div class="_navbar_search">  
            <div class="_navbar_search_main_all">
              <div class="_navbar_search_main">
                <Icon type="ios-search-outline" />
                <input type="text"  placeholder="Search..">
                <div class="outline"></div>
              </div>
            </div>
          </div> -->
        </div> 

        <div class="_navbar_right">
          <ul class="_navbar_right_list">
            <li class="_mosearch" @click="mobSearchOpen = true"><Icon type="ios-search-outline" /></li>
            <li class="_nav_pro">
              <Dropdown trigger="custom" :visible="visible" placement="bottom-end">
                <a href="javascript:void(0)" @click="handleOpen">
                  <div class="_nav_pro_pic">
                    <!-- <img class="_nav_pro_img" src="/img/profile.png" alt="" title=""> -->
                     <img class="_nav_pro_img" v-if="getAuthUser" :src="getAuthUser.profile_picture" title="" alt="">
                     <img class="_nav_pro_img" src="/img/profile.png" title="" alt="">
                      
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <div class="_nav_pro_main">
                    <div class="_nav_pro_top">
                      <div class="_nav_pro_top_pic">
                        <img class="_nav_pro_top_img" v-if="getAuthUser" :src="getAuthUser.profile_picture" title="" alt="">
                        <img class="_nav_pro_top_img" src="/img/profile.png" title="" alt="">
                      </div>
                      <div class="_nav_pro_top_details">
                        <p class="_nav_pro_top_name">{{ getAuthUser.firstName }} {{ getAuthUser.lastName }}</p>
                        <p class="_nav_pro_top_email">{{ getAuthUser.email }}</p>
                      </div>
                    </div>
                    <div class="_nav_pro_list_main _1border_color">
                      <ul class="_nav_pro_list">
                        <li  @click="handleClose">
                          <router-link to="/profile"   >
                            <Icon type="md-person" />
                            <p class="_nav_pro_list_text">My Profile</p>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="_nav_pro_list_main _1border_color">
                      <ul class="_nav_pro_list">
                        <li>
                          <a @click="logout">
                            <Icon type="ios-exit" />
                            <p class="_nav_pro_list_text">Log Out</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
        
        <!-- Mobile Search -->
        <div class="_mob_search"  :class="mobSearchOpen? '_mob_search_open' : ''">
          <div class="_mob_search_main">
            <div class="_navbar_search_main_all">
              <div class="_navbar_search_main">
                <Icon type="ios-search-outline" />
                <input type="text"  placeholder="Search..">
                <div class="outline"></div>
              </div>
            </div>
          </div>
          <div class="_mob_search_close"><Icon @click="mobSearchOpen = false" type="md-close" /></div>
        </div>
        <!-- Mobile Search -->
      </nav>
      <!-- Menu end -->

      <!-- Sidebar  -->
      <aside v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/reset_pass' && $route.path != '/forgetPassword'" :class="[(sidebar? '_left_sidebar _hide_sidebar':'_left_sidebar') , (lightSidebar? '_light_sidebar' : ''), (darkSidebar? '_dark_sidebar' : ''), (mobSidebar? '_mobSidebarOpen':'')]">
        <div class="_left_sidebar_main">
          <div class="_left_sidebar_top">
            <div class="_mobile_logo">
              <a href="" class="_navbar_logo_link">
                <img src="/img/main-logo.png" alt="" title="" class="_navbar_logo_img"> 
                <img src="/img/header.png" alt="" title="" class="_navbar_logo_img_text">
              </a>
            </div>

            <div class="_left_sidebar_top_main">
              <div class="_left_sidebar_pic">
                <!-- <img class="_left_sidebar_img" src="/img/profile.png" alt="" title=""> -->
                 <img class="_left_sidebar_img" v-if="getAuthUser" :src="getAuthUser.profile_picture" title="" alt="">
                <img class="_left_sidebar_img" src="/img/profile.png" title="" alt="">
                  
              </div>
            </div>
            <p class="_left_sidebar_pro">{{getAuthUser.userType}}</p>
            <p class="_left_sidebar_name">{{ getAuthUser.firstName }} {{ getAuthUser.lastName}}</p>
          </div>
          
          <div class="_left_sidebar_menu _1scrollbar">
            <Menu :theme="theme3" :active-name="activeRoute">
              <MenuGroup title="Dashboard">
                <p class="_group_name"><Icon type="ios-more" /></p>
                <MenuItem to="/" name="index">
                    <Icon type="md-home" />
                    <span class="submenu_text">Home</span>
                </MenuItem>
                <MenuItem to="/users" name="users">
                    <Icon type="md-people" />
                    <span class="submenu_text">User</span>
                </MenuItem>
                <MenuItem to="/questions" name="questions">
                  <Icon type="md-aperture" />
                  <span class="submenu_text">Question</span>
                </MenuItem>
                <MenuItem to="/profile" name="profile">
                  <Icon type="md-person" />
                  <span class="submenu_text">Profile</span>
                </MenuItem>
                <Submenu name="5">
                  <template slot="title">
                    <Icon type="md-aperture" />
                    <span class="submenu_text">Blog</span>
                  </template>
                  <MenuItem name="5-1" to="/add_blog"><Icon type="ios-paper" /><span class="menu_item_text">Publish New BLog</span></MenuItem>
                  <MenuItem to="/blog" name="5-2"><Icon type="md-paper" /><span class="menu_item_text">Blog List</span></MenuItem>
                  <!-- <MenuItem to="/blog_tags" name="5-2"><Icon type="md-paper" /><span class="menu_item_text">Blog Tag</span></MenuItem> -->
                </Submenu>
                <Submenu name="6">
                  <template slot="title">
                    <Icon type="md-aperture" />
                    <span class="submenu_text">Course</span>
                  </template>
                  <MenuItem name="6-1" :to="`/course/add_course`"><Icon type="ios-paper" /><span class="menu_item_text">Publish New Course</span></MenuItem>
                  <MenuItem :to="`/course/course_list`" name="6-2"><Icon type="md-paper" /><span class="menu_item_text">Course List</span></MenuItem>
                 </Submenu>
               
              </MenuGroup>
                
            </Menu>
          </div>
          
          <div class="_left_sidebar_bottom _1border_color">
            <Menu :theme="theme3" active-name="1">
                <MenuItem name="light">
                    <Icon @click="lightSidebarClick" type="ios-sunny" />
                    <span @click="lightSidebarClick" class="submenu_text">Light</span>
                </MenuItem>
                <MenuItem name="dark">
                    <Icon @click="darkModeClick" type="ios-moon" />
                    <span @click="darkModeClick" class="submenu_text">Dark</span>
                </MenuItem>
                <MenuItem name="logout">

                    <Icon type="md-log-out"  @click="logout"/>
                    <span class="submenu_text"  @click="logout" >Logout</span>
                </MenuItem>
            </Menu>
          </div>
        </div>
      </aside>
      <!-- Sidebar -->

      <div :class="[(sidebar? '_main_layout _mini_main_layout':'_main_layout') , ($route.path  != '/login' && $route.path  != '/register' && $route.path  != '/reset_pass' && $route.path  != '/forgetPassword'? '':'_login_layout')]"> 
        <!-- <router-view></router-view> -->     
           <nuxt/>
        <Footers v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/reset_pass' && $route.path != '/forgetPassword' && $route.path  != '/messenger'"/>
      </div>
    </div>
  </div>  
</template>

<script>
import Footers from "../layouts/footer.vue";
import { mapGetters } from 'vuex'

// import sidebar from '../components/sidebar.vue'
 export default {
    components: { 
    Footers
  }, 
computed: {
     ...mapGetters([
       'isLoggedIn',
      'getAuthUser',
     ])
  },
  data(){
    return{
      visible : false,
      activeRoute:'index',
      sidebar:false,
      isHovering: false,
      theme3: 'light',
      lightSidebar: true,
      darkSidebar: false,
      darkMode: false,
      mobSearchOpen: false,
      mobSidebar: false,
      spinLoading: false
    }
  },

  methods:{
      handleOpen () {
          this.visible = true;
      },
      handleClose () {
          this.visible = false;
      },
    async lightSidebarClick(){
      const res = await this.callApi('post', `auth/lightModeSave`, {dark_mode: 0} )
      if(res.status == 200 ){
          this.lightSidebar = true
          this.darkSidebar = false
          this.darkMode = false
      } 
    },
    async darkModeClick(){
      const res = await this.callApi('post', `auth/darkModeSave`, {dark_mode: 1})
      if(res.status == 200 ){
          this.darkSidebar = true
          this.lightSidebar = false
          this.darkMode = true
      } 
      
    }, 
    async logout() {
      // console.log("hello")
      try {
          let { data } = await this.$axios.get("auth/logout");
          this.$store.commit("setAuthUser", false);
          window.location = '/login'
      } catch (error) { 
          console.log(error);
      }
    },
  },
  watch: { 
    "$route.name": function (newVal, oldVal) {
       this.activeRoute = newVal; 
          
      },
    },
  created(){
      this.activeRoute = this.$route.name;
      if(!this.isLoggedIn){
        this.$router.push("/login");
      }
      if(this.getAuthUser.dark_mode == 1){
          this.darkSidebar = true
          this.lightSidebar = false
          this.darkMode = true
      }else{
          this.lightSidebar = true
          this.darkSidebar = false
          this.darkMode = false
      }
      // this.$store.commit('setAuthuser', (window.authUser));

  }
   
}
</script>

 