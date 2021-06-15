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
                                <div class="_input_box1">
                                    <p class="_label _mar_b15">Content </p>
                                    <quill-editor 
                                        ref="myQuillEditor"
                                        v-model="form.description"
                                    style="width: 100%;"
                                    @change="onEditorChange($event)"
                                        ></quill-editor>
                                </div>
                            </div>
                            
                            <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                 <p class="_label _mar_b15">Upload Course Videos</p>
                                <template>
                                <div class="demo-upload-list" v-for="(item,index) in contentList" :key="index">
                                        <img src="/../img/video-Icon.jpg" />
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleVideoView(item)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleVideoRemove(index)"></Icon>
                                        </div>
                                </div>
                                <div style="width: 58px;height:58px;line-height: 58px; border: 1px solid #ddd; text-align: center;cursor: pointer;" @click="videoAddModalOn">
                                    <span style="font-size: 24px;"><Icon type="md-add-circle" /></span>
                                    
                                </div>
                                </template>
                             </div>
                             <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                                 <br> <br> <br> <br>
                                 <Button type="primary" size="large" long :loading="loading" @click="addCourse">
                                    <span v-if="!loading">Publish</span>
                                    <span v-else>Please wait...</span>
                                </Button>
                             </div>

                        </div>
                        
                        
					</div>
				</div>
			</div>
		</div>
     <Modal title="Add Video" v-model="videoAddModal" :width="800" :mask-closable="false">
      <div class="col-12 col-md-12 col-lg-12">
            <div class="_box _b_radious3 _padd20">
            
              <div class="_table_responsive">
                <div class="_mar_b10">
                  <p class="_3title">Video Title</p>
                  <Input 
                    v-model="videoContentItem.title"
                    size="large"
                    type="text"
                    placeholder="Title"
                  />
                </div>
                  <div class="_mar_b10" >
                  <p class="_3title"></p>
                   
                  <template >
                    <Upload
                        v-if="contentVideo == ''"
                        type="drag"
                        :action=" backendUrl + 'blog/upload/image'"
                        :on-progress="handleProgressCoverV2"
                        :format="['mp4', 'flv', 'wmv', 'mkv','mov']"
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
                        <p>Click or drag Videos here to upload</p>
                      </div>
                    </Upload>
                    <div v-if="contentVideo" class="demo-upload-list _mar_t10">
                      <template v-if="contentVideo.status === 'finished'">
                        <!-- <img :src="cover.response.url" /> -->
                        <img src="/../img/video-Icon.jpg" />
                        <div class="demo-upload-list-cover">
                          <Icon
                            type="ios-trash-outline"
                            @click.native="handleRemoveCoverV2()"
                          ></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress
                          v-if="contentVideo.showProgress"
                          :percent="contentVideo.percentage"
                          hide-info
                        ></Progress>
                      </template>
                    </div>
                  </template>
                </div>
              </div> 
          </div>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long  @click="addVideoToContent">Add</Button>
        </div>
     </Modal> 
     <Modal v-model="videoVisibleModal" width="620" :footer-hide="true" :mask-closable="false">
        <div slot="close">
          <span style="font-size: 20px;color: #a8a8a8dd;" @click="closeVideo" > X <i class="fas fa-times"></i></span>
        </div>
        <p slot="header" style="color:#19be6b;text-align:center">
                <span> {{videoVisibleItem.title}} </span>
            </p> 
        <!-- <video controls autoplay loop muted>
          <source :src="videoURl" type="video/mp4">
        </video> -->       
        <vue-plyr
            ref="plyr"
            style="width: 100%; height: 100%"
        >
        <video :src="`${videoVisibleItem.source}`"  :type="`video/${videoVisibleItem.extType}`" >
        </video>
        </vue-plyr>
      </Modal>
	</div>
</template>
<script> 
export default {
    data () {
		return {
             videoAddModal:false,
            loading:false,
            backendUrl:"",
            cover: false,
            form:{
                title:'',
                description:'',
                cover_pic:'',
                data:''
            },
            contentList:[],
            contentVideo:'',
            videoVisibleModal:false,
             videoVisibleItem:'',
            videoContentItem:{
                "source": "",
                "hours": "", 
                "title": "",
                // "isIframe": false,
                "extType": "",
            }
		}
	},
	methods:{
        closeVideo(){
             this.$refs.plyr.player.stop();
        },
        videoAddModalOn(){
            this.videoContentItem ={
                "source": "",
                "hours": "",
                "title": "",
                "extType": "",
                // "isIframe": false,
            }
            this.videoAddModal = true;
        },
    handleVideoView(item) {
      this.videoVisibleItem = item;
      this.videoVisibleModal = true
    },
    handleVideoRemove(index) {
      this.contentList.splice(index,1);
    },
    addVideoToContent() {
        if (this.videoContentItem.title.trim() == "") return this.$Message.error( "Video Title is Required!"); 
        this.videoContentItem.source = this.contentVideo.response.url
        this.videoContentItem.extType = this.contentVideo.response.extType
        this.contentList.push(this.videoContentItem);
        this.videoContentItem ={
            "source": "",
            "hours": "",
            "title": "",
            // "isIframe": false,
            "extType": "",
      }
      this.contentVideo = ""
      this.videoAddModal = false;
    },
    handleProgressCoverV2(event, file, fileList) {
      // console.log('file')
      // console.log(file)
      this.contentVideo = file;
    },
    handleRemoveCoverV2() {
      this.contentVideo = "";
    },
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
        //   console.log(this.form.cover_pic)
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
             this.cover = false
      this.form.cover_pic = "";
    },
     
    async addCourse(){
        if (!this.form.title || this.form.title.trim() == "")
            return this.i("Title can't be empty!");
        if (!this.form.description || this.form.description.trim() == "")
            return this.i("Description can't be empty!");
        if (!this.form.cover_pic) {
            return this.i("Please Upload Cover Photo");
        }
        if(this.contentList.length < 1) 
            return this.$Message.error( "You must upload at least 1 video to this course!")
        this.form.data = this.contentList;

        this.loading = true; 
        const res = await this.callApi("post", `course/addCourse`, this.form);
        if (res.status == 200) {
                window.location = `/course/course_list`;
            //     window.location = '/';
            // this.$router.push('/')
            } else if (res.data.message) {
            this.e(res.data.message);  
        } else {
            this.swr();
        }
        this.loading = false;
    },
    onEditorChange({ quill, html, text }) {
        this.form.description = html;
    },

        
    },
	async created(){
		  this.backendUrl = this.$store.state.backendUrl     

  }
	
}
</script>