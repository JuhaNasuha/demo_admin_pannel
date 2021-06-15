<template>
	<div>
		<div class="_main_content">
			<div class="row">  
            <div class="col-12 col-md-12 col-lg-12">
					<div class="_box _b_radious3 _padd20">  
						 
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                <p class="_label _mar_b15">Title </p>
                                <Input type="text" v-model="form.title" placeholder="Title"></Input>
                            </div>
                            <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                <p class="_label _mar_b15">Upload Cover </p>
                                <Upload
                                    type="drag"
                                    :action=" backendUrl + 'blog/upload/image'"
                                    :on-progress="handleProgressCover"
                                    :on-success="handleSuccess"
                                    :format="['jpg', 'jpeg', 'png', 'gif']"
                                    :max-size="20480" 
                                    :on-format-error="handleFormatErrorCover"
                                    :on-exceeded-size="handleMaxSizeCover"
                                    :show-upload-list="false"
                                    >
                                    <div style="padding: 20px 0">
                                        <Icon
                                        type="ios-cloud-upload"
                                        size="52" 
                                        style="color: #3399ff"
                                        ></Icon>
                                        <p>Click or drag files here to upload</p>
                                    </div>
                                </Upload>
                                <div v-if="cover" class="demo-upload-list _mar_t10">
                                    <template v-if="cover.status === 'finished'">
                                        <img :src="cover.response.url" />
                                        <div class="demo-upload-list-cover">
                                        <Icon
                                            type="ios-trash-outline"
                                            @click.native="handleRemoveCover()"
                                        ></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress
                                        v-if="cover.showProgress"
                                        :percent="cover.percentage"
                                        hide-info
                                        ></Progress>
                                    </template>
                                </div>
                             </div>
                            <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                <p class="_label _mar_b15">Content </p>
                                    <quill-editor 
                                        ref="myQuillEditor" 
                                        v-model="form.description"
                                    style="width: 100%; height: 300px;"
                                    @change="onEditorChange($event)"
                                        ></quill-editor>
                            </div>
                             
                             <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                 <br> <br> <br> <br>
                                 <Button type="primary" size="large" long :loading="loading" @click="updateBlog">
                                    <span v-if="!loading">Update</span>
                                    <span v-else>Please wait...</span>
                                </Button>
                             </div>

                        </div>
                        
                        
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script> 
export default {
    data () {
		return {
            id:0,
            data:{},
            loading:false,
            backendUrl:"",
            cover: "",
            form:{
                id:'',
                title:'',
                description:'', 
                cover_pic:'',
                user_id:''
            }
		}
	},
	methods:{
        showImagePrompt(command) {
            if (this.inputURL.trim() == "") {
                return this.i("Please insert valid image URL");
            }
            let src = this.inputURL;
            command.image({ src });
            this.inputURL = "";
            this.uploadImageUrl = "URL";
            this.isImageClicked = false;
            return;
        },
        handleSuccess(res, file) {
          this.form.cover_pic = res.url;
          console.log(this.form.cover_pic)
        },
    handleProgressCover(event, file, fileList) {
      this.cover = file;
    },

    handleFormatErrorCover(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png or gif.",
      });
    },
 
    handleMaxSizeCover(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 20M.",
      });
    },
    handleRemoveCover() {
      this.form.cover_pic = "";
    },
        async updateBlog(){
            if (!this.form.title || this.form.title.trim() == "")
                return this.i("Title can't be empty!");
            if (!this.form.description || this.form.description.trim() == "")
                return this.i("Description can't be empty!");
             this.loading = true; 
             const res = await this.callApi("post", `blog/updateBlog`, this.form);
            if (res.status == 200) {
                 window.location = `/blog`;
             } else if (res.data.message) {
                this.e(res.data.message);  
            } else {
                this.swr();
            } 
            this.loading = false;
        },
        async getSingleBlog(){
            const res = await this.callApi("get", `blog/getSingleBlog?id=${this.id}`);
            if (res.status == 200) {
                this.data = res.data
                this.form.id = this.data.id
                this.form.title = this.data.title
                this.form.description = this.data.description
                this.form.cover_pic = this.data.cover_pic
                this.form.user_id = this.data.user_id
            }
        },
        onEditorChange({ quill, html, text }) {
          this.form.description = html;
        },
    },
	async created(){
          this.id = this.$route.params.id
          this.backendUrl = this.$store.state.backendUrl 
          this.getSingleBlog()    
  }
	
}
</script>