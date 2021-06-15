<template> 
	<div>
		<div class="_main_content">
			<div class="row">  
            <div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20">  
						<div class="_1card_top _mar_b20">
							<div class="_1card_top_left">
								<p class="_1card_top_title">All Questions</p>
								<div class="_1card_top_search search_text"> 
                                    <input type="text"  v-model="filterField" v-on:keyup="searchStart"  clearable placeholder="Search by question or answer ..." />
                                    <button class="search-btn" @click="searchStart">
                                        <Icon type="md-search" />
                                    </button> 
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
									<p> {{ row.question }} {{ row.answer }}</p>
								</template> -->
                                <template slot-scope="{ row, index }" slot="profile">
									<div class="profile_info">
										<span v-if="row.profile_picture"><img @click="showPictureModal(index)" class="image" :src="row.profile_picture" alt="image"></span>
                                        <span v-else><img class="image" src="/../img/profile.png" alt="profilePicture"></span>
										<div class="profile_info_details">
											<p class="profile_name"> {{ row.question }} {{ row.answer }}</p>
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
                <span> New Question </span>
            </p>
            <div class="row">
                 
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Question </p>
					<Input v-model="formValue.question" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="Address"/>
                 </div>                    
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Answer </p>
					<Input v-model="formValue.answer" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="Address"/>
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
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Question </p>
					<Input v-model="updateValue.question" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="Address"/>
                 </div>                    
                <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                    <p class="_label _mar_b15">Answer </p>
					<Input v-model="updateValue.answer" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="Address"/>
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
                  Are you sure you want to delete {{ data1[editIndex].question }} {{ data1[editIndex].answer }}
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
                question:'',
                answer:'',
            },
            editIndex:-1,
            editId:-1,
			formValue: {
                question:'',
                answer:'',
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
					title: 'Question',
					width: 400,
					key: 'question'
				},
				{
					title: 'Answer',
					width: 400,
					key: 'answer'
				},
 
                {   
                    title: 'Action',
                    key: 'action',
                    width: 150,
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
           this.updateValue.question = this.data1[index].question
           this.updateValue.answer = this.data1[index].answer
	    },
	    showRemove(index) {
            this.deleteModal = true
            this.editIndex=index
	    },
	    async addUser(){
            if(this.formValue.question.trim() == '') return this.i("Question can't be empty.")
            if(this.formValue.answer.trim() == '') return this.i("Answer can't be empty.")
                  this.loading = true
            const res = await this.callApi('post',`other/addQuestion`,this.formValue )
            if(res.status == 201 ||  res.status == 200){
                this.data1.push(res.data)
                this.formValue = {
                    question:'',
                    answer:'',
                    
                 }
              this.s('Great!','New question has been added successfully!')
              this.addModal = false
            }
            else if(res.status == 422 || res.status == 401){
                if(res.data){
                    if (res.data.message) {
                       this.e(res.data.message);
                    }else{
                        for (let item in res.data){
                            for (let item2 in res.data[item]){
                                this.e(res.data[item][item2])
                            }
                        }
                    }
                }
            }
            else{
                this.e('Oops!','Something went wrong, please try again!')
            }
            this.loading = false
	    },
        async updateUser(){
            if(this.updateValue.question.trim() == '') return this.i("Question can't be empty.")
            if(this.updateValue.answer.trim() == '') return this.i("Answer can't be empty.")
             this.loading = true
            const res = await this.callApi('post',`other/updateQuestion`,this.updateValue )
            if(res.status == 200){
                this.data1[this.editIndex].question = this.updateValue.question
                this.data1[this.editIndex].answer = this.updateValue.answer
                this.s('Great!','Updated successfully!')
            }
            else if(res.status == 422 || res.status == 401){
                if(res.data){
                    if (res.data.message) {
                       this.e(res.data.message);
                    }else{
                        for (let item in res.data){
                            for (let item2 in res.data[item]){
                                this.e(res.data[item][item2])
                            }
                        }
                    }
                }
            }else{
                this.e('Oops!','Something went wrong, please try again!')
            }
            this.loading = false
            this.editModal = false
        },
        async remove(){
            this.loading = true
            const res = await this.callApi('post',`other/deleteQuestion`,{id:this.data1[this.editIndex].id}  )
            if(res.status == 200){
                this.data1.splice(this.editIndex, 1)
                this.s('Great!','Deleted successfully!')
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
                const res = await this.callApi('get',`other/getQuestions?page=${this.page}&filterField=${this.filterField}`)
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
                const res = await this.callApi('get', `other/getQuestions?page=${this.page}&filterField=${this.filterField}`)
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