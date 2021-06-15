<template>
	<div>
		<div class="_main_content">
			<div class="row">  
				 
				<div class="col-12 col-md-6 col-lg-4 _mar_b20">
					<div class="_box _b_radious3">
						<router-link :to="`/blogs`">
							<div class="_dash_card">
								<div class="_dash_card_icon">
									<Icon type="ios-briefcase" />
								</div>
								<div class="_dash_card_details">
									<p class="_dash_card_amm">{{dashboard_data.totalBlogs}}</p>
									<p class="_dash_card_title"> Blogs</p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="col-12 col-md-6 col-lg-4 _mar_b20">
					<div class="_box _b_radious3">
						<router-link :to="`/blogs`">
							<div class="_dash_card">
								<div class="_dash_card_icon">
									<Icon type="ios-briefcase" />
								</div>
								<div class="_dash_card_details">
									<p class="_dash_card_amm">{{dashboard_data.totalCourse}}</p>
									<p class="_dash_card_title"> Course</p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="col-12 col-md-6 col-lg-4 _mar_b20">
					<div class="_box _b_radious3">
						<router-link :to="`/users`">
							<div class="_dash_card">
								<div class="_dash_card_icon">
									<Icon type="ios-people" />
								</div>
								<div class="_dash_card_details">
									<p class="_dash_card_amm">{{dashboard_data.totalUsers}}</p>
									<p class="_dash_card_title">Users</p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				 
				<div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20 _mar_b20">
						<div class="_1card_top _mar_b20">
							<div class="_1card_top_left">
								<p class="_1card_top_title">Recent Blogs</p>
 							</div>
							 <div class="_1card_top_right">
								<ul class="_1card_top_right_list">
  									<li>
										  <router-link :to="`/blog`">
											<Button  type="primary" >
												View More 
											</Button>
										</router-link>  
									</li>
								</ul>
							</div>
 						</div>
						<div class="_table_responsive">
							<Table class="_table700" border :columns="columns" :data="blogs">
								 <template slot="cover_picture" slot-scope="{row}">
                                     <div>
                                        <div class="demo-upload-list" >
                                            <img v-if="row.cover_pic" @click="showPictureModal( row.id )" :src="row.cover_pic" alt="cover_pic">
                                            <img v-else src="/../img/good_apple_1.jpg" alt="cover_pic">
                                        </div>
                                    </div>
                                </template>
								<template slot-scope="{ row }" slot="user">
									<div v-if="row.user" class="profile_info">
										<span v-if="row.user.profile_picture"><img  class="image" :src="row.user.profile_picture" alt="image"></span>
                                        <span v-else><img class="image" src="/../img/male.jpeg" alt="profilePicture"></span>
										<div  class="profile_info_details">
											<p class="profile_name"> {{ row.user.firstName }}  {{ row.user.lastName }}</p>
											<p class="profile_gender">  
											 {{ row.user.email }}  </p>
										</div>
									</div>
								</template>
								 
							</Table>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20 _mar_b20">
						<div class="_1card_top _mar_b20">
							<div class="_1card_top_left">
								<p class="_1card_top_title">Recent Users</p>
 							</div>
							 <div class="_1card_top_right">
								<ul class="_1card_top_right_list">
  									<li>
										  <router-link :to="`/users`">
                            <Button  type="primary" >
                                View More 
                            </Button>
                        </router-link>  
                      </li>
								</ul>
							</div>
 						</div>
						<div class="_table_responsive">
							<Table class="_table700" border :columns="columns2" :data="users">
								<template slot-scope="{ row, index }" slot="profile">
									<div class="profile_info">
										<span v-if="row.profile_picture"><img @click="showPictureModal(index)" class="image" :src="row.profile_picture" alt="image"></span>
                                        <span v-else><img class="image" src="/img/profilePic.jpeg" alt="profilePicture"></span>
										<div class="profile_info_details">
											<p class="profile_name"> {{ row.first_name }}  {{ row.last_name }}</p>
											<p class="profile_gender">  
											 {{ row.email }}  </p>
										</div>
									</div>
								</template>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data () {
		return {
			datacollection: null,
			dashboard_data:{
			},
			columns:[
				{
					title: 'Id',
					width: 60,
					key: 'id'
				},
				{
					title: 'Cover Picture',
					width: 120,
					slot: "cover_picture"
 				},
				{
					title: 'Title',
					width: 500,
 					key: 'title'
				},
				{
					title: 'Views',
					key: 'views',
					width: 120
				},
				{
					title: 'Create By',
					width: 230,
 					slot: 'user'
				},
				 
			],
			columns2:[
				{
					title: 'Id',
					width: 60,
					key: 'id',
 				},
				{
					title: 'Name',
					width: 250,
					slot: "profile"
 				},
				{
					title: 'Email',
					width: 250,
					key: 'email'
				},
				{
					title: 'User Name',
					width: 150,
					key: 'username'
				},
				{
					title: 'Gender',
					width: 130,
					key: 'gender'
				},
				{
					title: 'Mobile',
					width: 150,
					key: 'contact'
				},
			],
			blogs:[],
			users:[],

		}
  },
  computed: {
     ...mapGetters([
       'isLoggedIn',
      'getAuthUser',
     ])
  },
	methods:{

	},
	async created(){  
      if(!this.isLoggedIn){
        this.$router.push("/login");
      }
         const [res1] = await Promise.all([
             this.callApi('get',`get_home_data`),
         ])
             if(res1.status == 200 ){
				this.blogs = res1.data.latestBlogs;
				this.users = res1.data.latestUser;
				delete res1.data.latestBlogs
				delete res1.data.latestUser
				this.dashboard_data = res1.data;
             }else{
                this.e('Oops!','Something went wrong, please try again!')
             }

      
	}
	
}
</script>