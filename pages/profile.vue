<template>
	<div>
		<div class="_main_content">
			<div class="_profile_edit">
				<div class="row">
					<div class="col-12 col-md-4 col-lg-4">
						<div class="_profile_edit_lft">
							<div class="_profile_edit_top">
								<h2 class="_profile_edit_titl1">
									My Profile
								</h2>
							</div>
							<div class="_profile_edit_lft_bdy">
								<div class="_profile_edit_lft_pic">
									 <div class="_profile_edit_pic">
                                         <!-- <Upload v-if="profileImageOn"
                                                type="drag"
                                                :on-success="handleImageUpload" 
                                                :action=" backendUrl + 'blog/upload/image'">
                                                <div>
                                                    <Icon type="ios-camera" ></Icon>
                                                    <p>Drag files here</p>
                                                </div>
                                        </Upload> -->
                                        <!-- <img v-else :src="getAuthUser.profile_picture"  > -->
                                        <img v-if="getAuthUser.profile_picture" :src="getAuthUser.profile_picture"  >
                                        <img v-else src="/../img/profile.png"  >
                                        <span>
                                            <Upload  
                                                ref="upload"
                                                type="drag"
                                                :on-success="handleImageUpload" 
                                                :action=" backendUrl + 'blog/upload/image'">
                                                <i class="ivu-icon ivu-icon-ios-camera"></i>                                                
                                            </Upload>
                                        </span>
 										</div>
									 <div class="_profile_edit_info">
									 	<h3 class="_profile_edit_titl2">
										  {{getAuthUser.firstName}} {{ getAuthUser.lastName}}
									    </h3>
									    <p class="_profile_edit_txt1">
									    	{{ getAuthUser.userType}}
									    </p>
                                        <!-- <div class="">
                                            <br>
                                            <button v-if="profileImageOn== false" type="submit" @click="profileImageOn = true" class="btn btn-primary" > Change Photo </button>
                                        </div> -->
									 </div>
								</div>
                                 
								<div class="_prfl_frm_sngl">
									<label class="_prfl_frm_lbl">Current Password</label>
									 <Input type="password" v-model="passwordValue.currentPassword" placeholder="Current Password"/>
								</div>
								<div class="_prfl_frm_sngl">
									<label class="_prfl_frm_lbl">New Password</label>
									 <Input type="password" v-model="passwordValue.password" placeholder="New Password"/>
								</div>
								<div class="_prfl_frm_sngl">
									<label class="_prfl_frm_lbl">Confirm Password</label>
									 <Input type="password" v-model="passwordValue.confirmPassword" placeholder="Confirm Password"/>
								</div>
								<!-- <button class="_prfl_frm_btn" @click="passwordUpdate">
									Save
								</button> -->
                                <button type="submit" v-if="Passwordloading == false" @click="passwordUpdate" class="_prfl_frm_btn">Save</button>
                                <button type="submit" v-else disabled class="_prfl_frm_btn">Please wait..</button>
									
							</div>
						</div>
					</div>
					<div class="col-12 col-md-8 col-lg-8">
						<div class="_profile_edit_r8">
							<div class="_profile_edit_top">
								<h2 class="_profile_edit_titl1">
									Edit Profile
								</h2>
							</div>
							<div class="_profile_edit_r8_bdy">
								<div class="row">
									<div class="col-12 col-md-6 col-lg-6">
										<div class="_prfl_frm_sngl">
											<label class="_prfl_frm_lbl"> First Name</label>
											 <Input type="text" v-model="updateValue.firstName" placeholder="First Name"/>
										</div>
									</div>
									<div class="col-12 col-md-6 col-lg-6">
										<div class="_prfl_frm_sngl">
											<label class="_prfl_frm_lbl"> Last Name</label>
											 <Input type="text" v-model="updateValue.lastName" placeholder="Last Name"/>
										</div>
									</div>
                                   
									<div class="col-12 col-md-12 col-lg-12">
										<div class="_prfl_frm_sngl">
											<label class="_prfl_frm_lbl">Email address</label>
											 <Input type="text" v-model="updateValue.email" placeholder="Email"/>
										</div>
									</div>
									
                                     <div class="col-12 col-md-6 col-lg-6">
										<div class="_prfl_frm_sngl">
											<label class="_prfl_frm_lbl">Contact Number</label>
											 <Input v-model="updateValue.contact" type="text" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-12 col-md-6 col-lg-6">
										<p class="_label _mar_b15">Gender</p>
                                        <Select
                                            style="width:100%;"
                                            placeholder=" Select gender"
                                            v-model="updateValue.gender"
                                            >
                                            <Option value="Male" >Male</Option>
                                            <Option value="Female" >Female</Option>
                                            <Option value="Other" >Other</Option>
                                        </Select>
									</div>
									 
								</div>
								<div class="_profile_edit_r8_btn">
                                    <button type="submit" v-if="loading == false" @click="updateUser" class="_prfl_frm_btn">Update Profile</button>
                                    <button type="submit" v-else disabled class="_prfl_frm_btn">Updating..</button>
									
								</div>
							</div>	 
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
    data(){
        return{
            backendUrl:"",
            editModal: false,
            PasswordModal: false,
            loading: false,
            Passwordloading: false,
            updateValue: {
                id:'',
                firstName:'',
                lastName:'',
                email:'',
                contact:'',
                gender: '',
              },
            passwordValue:{
                currentPassword: "",
                password: "",
                confirmPassword: "",
            },
            formValue: {
                 profile_picture: ""
            },
            buttonOn: false,
            image:"",
			profileImageOn :false,
        };
    },
    computed: {
        ...mapGetters([
        'isLoggedIn', 
        'getAuthUser', 
        ])
    },
    methods:{
        async handleImageUpload(res, file) {
            if (res) {
				this.image = res.url
			}
			const res2 = await this.callApi(
				"post",
				`user/addProfilePicture`,
				{profile_picture:this.image}
       		);
       		if (res2.status == 200) {
                this.s("Great!", "Image has been updated successfully!");
                this.$refs.upload.clearFiles()
                this.profileImageOn= false
                 this.$store.commit('setAuthUser', (res2.data));
                //  console.log(res.data)
			} else {
			this.e("Oops!", "Something went wrong, please try again!");
			}
		},
        async passwordUpdate(){
            if (!this.passwordValue.currentPassword) return this.e("Current Password can not be empty! !");
            if (!this.passwordValue.password) return this.e("New Password can not be empty! !");
            if (!this.passwordValue.confirmPassword) return this.e("Confirm Password can not be empty! !");
            if (this.passwordValue.password != this.passwordValue.confirmPassword) return this.e("Password doesn't match! !");
            this.Passwordloading = true
            const res = await this.callApi(
                "post",
                `user/updatePassword`,
                this.passwordValue
            );
            if (res.status == 200) {
                this.passwordValue.currentPassword = ''
                this.passwordValue.password = ''
                this.passwordValue.confirmPassword = ''
                this.s("Great!", "Password has been updated successfully!");
            }
            else if (res.status == 422 || res.status == 401) {
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
            }else if(res.status == 406){
                this.e(res.data);
            }
            else {
                this.e("Oops!", "Something went wrong, please try again!");
            }
            this.Passwordloading = false
        },
        async updateUser() { 
            if (this.updateValue.firstName.trim() == "") return this.e("First Name can't be empty! !");
            if (this.updateValue.lastName.trim() == "") return this.e("Last Name can't be empty! !");
            if (this.updateValue.email.trim() == "") return this.e("Email can't be empty! !");
            this.loading = true
            const res = await this.callApi(
                "post",
                `user/updateUser`,  
                this.updateValue
            );
            if (res.status == 200) { 
                  this.$store.commit('setAuthUser', (res.data));
                 this.s("Great!", "Profile  has been updated successfully!");
            }else if (res.status == 422 || res.status == 401) {
                if (res.data) {
                    for (let item in res.data) {
                        for (let item2 in res.data[item]) {
                        this.e(res.data[item][item2]);
                        }
                    }
                }
            } else {
                this.e("Oops!", "Something went wrong, please try again!");
            }
            this.loading = false
        },
    },
    created(){
        this.backendUrl = this.$store.state.backendUrl     
        this.updateValue.id = this.getAuthUser.id
         this.updateValue.firstName = this.getAuthUser.firstName
        this.updateValue.lastName = this.getAuthUser.lastName
        this.updateValue.email = this.getAuthUser.email
        this.updateValue.contact = this.getAuthUser.contact
        this.updateValue.gender = this.getAuthUser.gender
     }
}
</script>