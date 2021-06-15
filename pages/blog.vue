<template>
	<div>
		<div class="_main_content">
			<div class="row">  
            <div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20">  
						<div class="_1card_top _mar_b20">
							<div class="_1card_top_left">
								<p class="_1card_top_title">Blog table</p>
								<div class="_1card_top_search search_text"> 
                                    <input type="text"  v-model="filterField" v-on:keyup="searchStart"  clearable placeholder="Search by name or email ..." />
                                    <button class="search-btn" @click="searchStart">
                                        <Icon type="md-search" />
                                    </button> 
									  <!-- <Input search enter-button="Search" v-model="filterField" v-on:keyup="searchStart"  clearable placeholder="Search by email ..." /> -->
								</div>
							</div>
							<!-- <div class="_1card_top_right">
								<ul class="_1card_top_right_list">
									<li><Button type="primary"  @click="addModal = true">Add</Button></li>
								</ul>
							</div> -->
						</div>
						<div class="_table_responsive">
							<Table class="_table700" border :columns="columns1" :data="data1">
                                <template slot="cover_picture" slot-scope="{row}">
                                     <div>
                                        <div class="demo-upload-list" >
                                            <img v-if="row.cover_pic" @click="showPictureModal( row.id )" :src="row.cover_pic" alt="cover_pic">
                                            <img v-else src="/../img/good_apple_1.jpg" alt="cover_pic">
                                            <!-- <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click="handleView(row.image)"></Icon>
                                            </div> -->
                                        </div>
                                    </div>
                                </template>
								<!-- <template slot-scope="{ row  }" slot="description">
									<span v-html="row.description "> {{ row.description }} </span>
								</template> -->
                                <template slot-scope="{ row  }" slot="title">
									<span v-if="row.title.length<=70"> {{ row.title }} </span>
                                    <span  v-else >{{ row.title.substring(1, 70) }}...</span> 
                                </template>
								<template slot-scope="{ row  }" slot="description">
									<!-- <span v-html="row.description "> {{ row.description }} </span> -->
                                    <Button  type="success" class="_button_black"   @click="showDescription(row.id)"> Show Description</Button>
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
                                <template slot-scope="{ row, index }" slot="action">
                                     <nuxt-link :to="`/edit/${row.id}`"><Button  type="info"  class="_button_black"  size="small">EDIT</Button></nuxt-link>
                                    <Button  type="error" class="_button_black" size="small" @click="showRemove(index)"> DELETE</Button>
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
        <Modal  v-model="descriptionModal" width="500" :mask-closable="false"   :closable="false">
            <p slot="header" style="color:#19be6b;text-align:center">
                <span> Description </span> 
            </p>
            <div>
                <h3 style="text-align:center">{{ title }} </h3>
                                 <br>
                <p v-html="description"> {{ description }}
                </p>
            </div>
            <div slot="footer">
                <Button type="success" @click="descriptionModal=false" long >Close</Button>
            </div>
        </Modal>
	    <Modal v-model="deleteModal" width="600">
              <p slot="header"   style="color:#f60;text-align:center">
                  <Icon type="close"></Icon>
                  <span v-if="data1[editIndex]"> Delete Blog</span>
              </p>
              <div  v-if="data1[editIndex]" style="text-align:center">
                  Are you sure you want to delete {{ data1[editIndex].title }} blog?
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
                <span> Cover Image </span>
            </p>
            <div>
                <img :src="imageUrl" alt="image"  >
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
			deleteModal:false,
            pictureModal : false,
			descriptionModal:false,
            imageUrl:'',
            filterField:'',
            loading:false,
			datacollection: null,
			userModal:false,
            confirmPassword:"",
            editIndex:-1,
			columns1: [
				{
					title: 'Id',
					width: 60,
					key: 'id',
 				},
				{
					title: 'Cover Picture',
					width: 150,
					slot: "cover_picture"
 				},
				{
					title: 'Title',
					width: 350,
					slot: "title"
 				},
				{
					title: 'Description',
					width: 150,
					slot: 'description'
				},
				{
					title: 'User',
					width: 250,
					slot: 'user'	 
                },
                {
                    title: 'Action',
					width: 250,
					slot: 'action'
                }
			],
			data1: [],
			dataListPagination:[],
            page:1, 
            details:{},
            description:'',
            title:'',
		}
	},
	methods:{
       showDescription(item){
            var index = this.data1.findIndex(x => x.id === item);
            this.description = this.data1[index].description
            this.title = this.data1[index].title
            this.descriptionModal = true
                
         },   
        showPictureModal(item){
            var index = this.data1.findIndex(x => x.id === item);
            // console.log(this.data1[index], "full index")
            this.imageUrl = this.data1[index].cover_pic
            // console.log(this.imageUrl)
            this.pictureModal = true
        },
		showDetails(index){  
			this.userModal = true
			this.details = this.data1[index]
		},
	   
	    showRemove(index) {
            this.deleteModal = true
            this.editIndex=index
	    },
        async remove(){ 
            this.loading = true
            const res = await this.callApi('post',`blog/deleteBlog`, { id:this.data1[this.editIndex].id }  )
             if(res.status == 200){
                this.data1.splice(this.editIndex, 1)
                this.s('Great!','Blog has been deleted successfully!')
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
		getpaginate(e){
            this.page = e
            this.getAllData()
        },
        async searchByEmail(){
            if(this.filterField){
                const res = await this.callApi('get',`getAllUser?page=${this.page}&filterField=${this.filterField}`)
                if(res.status == 200){
                    this.data1 =  res.data.User.data;
                    delete res.data.User.data
                    this.dataListPagination = res.data.User;
                }
                else{
                    this.e('Oops!','Something went wrong, please try again!')
                }
           }
           else {
              this.getAllData()
           }
        },  
        async getAllData(){
                this.loading = true
                const res = await this.callApi('get', `blog/getAllBlog?page=${this.page}&filterField=${this.filterField}`)
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

    }
	
}
</script>