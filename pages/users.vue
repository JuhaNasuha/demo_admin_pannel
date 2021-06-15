<template> 
	<div>
		<div class="_main_content">
			<div class="row">  
            <div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20">  
						<div class="_1card_top _mar_b20">
							<div class="_1card_top_left">
								<p class="_1card_top_title">User table</p>
								<div class="_1card_top_search search_text"> 
                                    <input type="text"  v-model="filterField" v-on:keyup="searchStart"  clearable placeholder="Search by name or email ..." />
                                    <button class="search-btn" @click="searchStart">
                                        <Icon type="md-search" />
                                    </button> 
									  <!-- <Input search enter-button="Search" v-model="filterField" v-on:keyup="searchStart"  clearable placeholder="Search by email ..." /> -->
								</div>
							</div>
							<div class="_1card_top_right">
								<ul class="_1card_top_right_list">
									<li><Button type="primary"  @click="addModal = true">Add</Button></li>
								</ul>
							</div>
						</div>
						<div class="_table_responsive">
							<Table class="_table700" border :columns="columns1" :data="data1">
								<!-- <template slot-scope="{ row  }" slot="profile">
									<p> {{ row.firstName }} {{ row.lastName }}</p>
								</template> -->
                                <template slot-scope="{ row, index }" slot="profile">
									<div class="profile_info">
										<span v-if="row.profile_picture"><img @click="showPictureModal(index)" class="image" :src="row.profile_picture" alt="image"></span>
                                        <span v-else><img class="image" src="/../img/profile.png" alt="profilePicture"></span>
										<div class="profile_info_details">
											<p class="profile_name"> {{ row.firstName }} {{ row.lastName }}</p>
											<p class="profile_gender">  
											 {{ row.email }}  </p>
										</div>
									</div>
								</template>
							</Table>
						</div>
						<div class="_pagination _padd_t20">
							<Page :current="dataListPagination.current_page" :total="dataListPagination.total" @on-change="getpaginate" :page-size="parseInt(dataListPagination.per_page)" />
							<!-- <Page :total="100" show-sizer /> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		 
	    <Modal v-model="addModal" :mask-closable="false"   :closable="false" width="800">
            <p slot="header" style="color:#369;text-align:center">
                <Icon type="plus"></Icon>
                <span> New User </span>
            </p>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">First Name </p>
                    <Input type="text" placeholder="First Name"  v-model="formValue.firstName"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Last Name </p>
                    <Input type="text" placeholder="Last Name"  v-model="formValue.lastName"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Email </p>
                    <Input type="text" placeholder="Email"  v-model="formValue.email"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Phone Number </p>
                    <Input type="text" placeholder="Phone Number"  v-model="formValue.contact"></Input>
                </div>
				<div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Gender</p>
                    <Select
                        style="width:100%;"
                        placeholder=" Select gender"
                        v-model="formValue.gender"
                        >   
                        <Option value="Male" >Male</Option>
                        <Option value="Female" >Female</Option>
                        <Option value="Other" >Other</Option>
                    </Select>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">User Type</p>
                    <Select
                        style="width:100%;"
                        placeholder=" Select userType"
                        v-model="formValue.userType"
                        >
                        <Option value="Admin" >Admin</Option>
                        <Option value="User" >User</Option>
                     </Select>
                </div>
				 
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Password </p>
                    <Input type="password" placeholder="Password"  v-model="formValue.password"></Input>
                </div>
				<div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Confirm Password </p>
                    <Input type="password" placeholder="Confirm Password"  v-model="confirmPassword"></Input>
                </div> 
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Profile Picture </p>
					 <Upload
						ref="upload"
                        type="drag"
                           
                        :with-credentials="true"
                        :on-success="handleImageUpload"
						:action=" backendUrl + 'blog/upload/image'"
                         >
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>Click or drag files here to upload</p>
						</div>
					</Upload>
                 </div>                    
            </div>
            <div slot="footer">
                <Button class="all_button" type="default" @click="addModal = false">
                    <span >Close</span>
                </Button>
                <Button :loading="loading" class="all_button" type="primary" @click="addUser()">
                    <span v-if="!loading">Add</span>
                    <span v-else>Adding...</span>
                </Button>
            </div>
        </Modal>
	    <Modal v-model="editModal" :mask-closable="false"   :closable="false" width="800">
            <p slot="header" style="color:#369;text-align:center">
                <Icon type="plus"></Icon>
                <span> Edit User </span>
            </p>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">First Name </p>
                    <Input type="text" placeholder="First Name"  v-model="updateValue.firstName"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Last Name </p>
                    <Input type="text" placeholder="Last Name"  v-model="updateValue.lastName"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Email </p>
                    <Input type="text" placeholder="Email"  v-model="updateValue.email"></Input>
                </div>
                <div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">Phone Number </p>
                    <Input type="text" placeholder="Phone Number"  v-model="updateValue.contact"></Input>
                </div>
				<div class="col-12 col-md-6 col-lg-6 _mar_b20">
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
				<div class="col-12 col-md-6 col-lg-6 _mar_b20">
                    <p class="_label _mar_b15">User Type</p>
                    <Select
                        style="width:100%;"
                        placeholder=" Select userType"
                        v-model="updateValue.userType"
                        >
                        <Option value="Admin" >Admin</Option>
                        <Option value="User" >User</Option>
                     </Select>
                </div>
				 			
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Profile Picture </p>
					 <Upload
						ref="upload"
                        type="drag"
                          
                        :with-credentials="true"
                        :on-success="handleEditImageUpload"
						:action=" backendUrl + 'blog/upload/image'"
                         >
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>Click or drag files here to upload</p>
						</div>
					</Upload>
                 </div>
            </div>
            <div slot="footer">
                <Button class="all_button" type="default" @click="editModal = false">
                    <span >Close</span>
                </Button>
                <Button :loading="loading" class="all_button" type="primary" @click="updateUser()">
                    <span v-if="!loading">Update</span>
                    <span v-else>Updating...</span>
                </Button>
            </div>
        </Modal>
	    <Modal v-model="deleteModal" width="600">
              <p slot="header"   style="color:#f60;text-align:center">
                  <Icon type="close"></Icon>
                  <span v-if="data1[editIndex]"> Delete User</span>
              </p>
              <div  v-if="data1[editIndex]" style="text-align:center">
                  Are you sure you want to delete {{ data1[editIndex].firstName }} {{ data1[editIndex].lastName }}
              </div>
              <div slot="footer">
                  <Button type="error" size="large" long :loading="loading" @click="remove">
                      <span v-if="!loading">Delete</span>
                      <span v-else>Deleting...</span>
                  </Button>
              </div>
        </Modal>
        <Modal  v-model="pictureModal" width="500" :mask-closable="false"   :closable="false">
            <p slot="header" style="color:#19be6b;text-align:center">
                <span> Profile Picture </span>
            </p>
            <div>
                <img :src= "imageUrl" alt="image"  >
            </div>
            <div slot="footer">
                <Button type="success" @click="pictureModal=false" long >Close</Button>
            </div>
         </Modal>
	</div>
</template>
<script> 
export default {
    data () {
		return {
            backendUrl:"",
			addModal:false,
			editModal:false,
			deleteModal:false,
            pictureModal : false,
            imageUrl:'',
            filterField:'',
            loading:false,
            updateValue:{
                id:-1,
                firstName:'',
                lastName:'',
                email:'',
                contact:'',
                gender: '',
                userType: '',
                profile_picture:'',
            },
            editIndex:-1,
            editId:-1,
			formValue: {
                firstName:'',
                lastName:'',
                email:'',
                contact:'',
                gender: '',
                userType: '',
                profile_picture:'',
            },  
			datacollection: null,
			userModal:false,
			confirmPassword:"",
			columns1: [
				{
					title: 'Id',
					width: 60,
					key: 'id',
 				},
				{
					title: 'Name',
					width: 350,
					slot: "profile"
 				},
				{
					title: 'contact',
					width: 130,
					key: 'contact'
				},
				{
					title: 'Email',
					width: 200,
					key: 'email'
				},
				{
					title: 'Gender',
					width: 200,
					key: 'gender'
				},
                {   
                    title: 'Action',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showEdit(params.index)
                                    }
                                }
                            }, 'Edit'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.showRemove(params.index)
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
			],
			data1: [],
			dataListPagination:[],
            page:1, 
			details:{},
		}
	},
	methods:{
        async handleImageUpload(res, file) {
            if (res) {
                this.formValue.profile_picture = res.url
            }
        },
        async handleEditImageUpload(res, file) {
            if (res) {
                this.updateValue.profile_picture = res.url
            }
        },
        showPictureModal(index){
            this.imageUrl = this.data1[index].profile_picture
            this.pictureModal = true
        },
		showDetails(index){  
			this.userModal = true
			this.details = this.data1[index]
		},
	    showEdit(index) {
           this.editModal = true
           this.editIndex = index
           this.updateValue.id = this.data1[index].id
           this.updateValue.firstName = this.data1[index].firstName
           this.updateValue.lastName = this.data1[index].lastName
           this.updateValue.email = this.data1[index].email
           this.updateValue.contact = this.data1[index].contact
           this.updateValue.gender = this.data1[index].gender
           this.updateValue.userType = this.data1[index].userType
           this.updateValue.profile_picture = this.data1[index].profile_picture
          
	    },
	    showRemove(index) {
            this.deleteModal = true
            this.editIndex=index
	    },
	    async addUser(){
            if(this.formValue.firstName.trim() == '') return this.i("First name can't be empty.")
            if(this.formValue.lastName.trim() == '') return this.i("Last name can't be empty.")
            if(this.formValue.email.trim() == '') return this.i("Email can't be empty. ")
            if(!this.formValue.password) return this.i("Please make a password ")
            if(!this.confirmPassword) return this.i(" Confirm password can't be empty. ")
            if(this.formValue.password != this.confirmPassword ) return this.i(" Password doesn't match .")
            this.loading = true
            const res = await this.callApi('post',`user/addUser`,this.formValue )
            if(res.status == 201 ||  res.status == 200){
                this.data1.push(res.data)
                this.formValue = {
                    firstName:'',
                    lastName:'',
                    email:'',
                    contact:'',
                    gender: '',
                     profile_picture:'',
                 }
              this.s('Great!','New user has been added successfully!')
              this.addModal = false
            }
            else if(res.status == 422){
                if(res.data){
                    for (let item in res.data){
                    for (let item2 in res.data[item]){
                        this.e(res.data[item][item2])
                        }
                    }
                }
                this.loading = false
            }else if(res.status == 401){
                    if (res.data.msg) {
                       this.e(res.data.msg);
                    }
                    else{
                      if(res.data){
                      for (let item in res.data){
                        // for (let item2 in res.data[item]){
                          this.e(res.data[item].message)
                        // }
                        }
                      }
                    }
                }else{
                this.e('Oops!','Something went wrong, please try again!')
            }
            this.loading = false
	    },
        async updateUser(){
            if(this.updateValue.firstName.trim() == '') return this.i("First name can't be empty.")
            if(this.updateValue.lastName.trim() == '') return this.i("Last name can't be empty.")
            if(this.updateValue.email.trim() == '') return this.i("Email can't be empty. ")
            this.loading = true
            const res = await this.callApi('post',`user/updateUser`,this.updateValue )
            if(res.status == 200){
                this.data1[this.editIndex].firstName = this.updateValue.firstName
                this.data1[this.editIndex].lastName = this.updateValue.lastName
                this.data1[this.editIndex].gender = this.updateValue.gender
                 this.data1[this.editIndex].email = this.updateValue.email
                this.data1[this.editIndex].contact = this.updateValue.contact
                this.data1[this.editIndex].profile_picture = this.updateValue.profile_picture
                this.s('Great!','User has been updated successfully!')
            }
            else if(res.status == 422){
            if(res.data){
                for (let item in res.data){
                for (let item2 in res.data[item]){
                    this.e(res.data[item][item2])
                    }
                }
                }
                this.loading = false
            }else{
                this.e('Oops!','Something went wrong, please try again!')
            }
            this.loading = false
            this.editModal = false
        },
        async remove(){
            this.loading = true
            const res = await this.callApi('post',`user/deleteUser`,{id:this.data1[this.editIndex].id}  )
            if(res.status == 200){
                this.data1.splice(this.editIndex, 1)
                this.s('Great!','User has been deleted successfully!')
                this.loading = false
                this.deleteModal = false
            }else{
                this.loading = false
                this.deleteModal = false
                this.e('Oops!','Something went wrong, please try again!')
            }
        },
        searchStart(){
            this.page = 1
            this.getpaginate(this.page)
        },
        async searchByEmail(){
            if(this.filterField){
                const res = await this.callApi('get',`user/getAllUser?page=${this.page}&filterField=${this.filterField}`)
                if(res.status == 200){
                    this.data1 = res.data.data;
                    delete res.data.data
                    this.dataListPagination = res.data;
                }
                else{
                    this.e('Oops!','Something went wrong, please try again!')
                }
           }
           else {
              this.getAllData()
           }
        },  
        getpaginate(page){
                this.page = page
                this.searchByEmail()
        },
        async getAllData(){
                this.loading = true
                const res = await this.callApi('get', `user/getAllUser?page=${this.page}&filterField=${this.filterField}`)
                if (res.status == 200) { 
                    this.data1 = res.data.data;
                    delete res.data.data
                    this.dataListPagination = res.data;
                } else {
                    this.swr()
                }
            this.loading = false
        }
    },
	async created(){
		this.getAllData()
		this.backendUrl = this.$store.state.backendUrl     
  }
	
}
</script>