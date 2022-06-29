<template>
  <div class="card">
    <div class="row" style="padding-left: 23px ">
      <span>дом {{item.house}} {{item.name}} {{guide.house_tip.find(guide => guide.id === item.tip).name}}</span>
    </div>
    <div class="row">
      <div class="col-xl-3 col-lg-12 col-md-5 xl-35">
        <div class="default-according style-1 faq-accordion job-accordion">
          <div class="row">
            <div class="col-xl-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="p-0">
                    <button class="btn btn-link ps-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseicon2" aria-expanded="false" aria-controls="collapseicon2">About Me</button>
                  </h5>
                </div>
                <div class="collapse" id="collapseicon2" aria-labelledby="collapseicon2" data-parent="#accordion" style="">
                  <div class="card-body post-about">
                    <ul>
                      <li>
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>
                        <div>
                          <h5>UX desginer at Pixelstrap</h5>
                          <p>banglore - 2021</p>
                        </div>
                      </li>
                      <li>
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
                        <div>
                          <h5>studied computer science</h5>
                          <p>at london univercity - 2015</p>
                        </div>
                      </li>
                      <li>
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
                        <div>
                          <h5>relationship status</h5>
                          <p>single</p>
                        </div>
                      </li>
                      <li>
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                        <div>
                          <h5>lived in london</h5>
                          <p>last 5 year</p>
                        </div>
                      </li>
                      <li>
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg></div>
                        <div>
                          <h5>blood group</h5>
                          <p>O+ positive</p>
                        </div>
                      </li>
                    </ul>
                    <div class="social-network theme-form"><span class="f-w-600">Social Networks</span>
                      <button class="btn social-btn btn-fb mb-2 text-center"><i class="fa fa-facebook m-r-5"></i>Facebook</button>
                      <button class="btn social-btn btn-twitter mb-2 text-center"><i class="fa fa-twitter m-r-5"></i>Twitter</button>
                      <button class="btn social-btn btn-google text-center"><i class="fa fa-dribbble m-r-5"></i>Dribbble</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-6 col-md-12 col-sm-6">
              <div class="card">
                <div class="card-header">
                  <h5 class="p-0">
                    <button class="btn btn-link ps-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseicon8" aria-expanded="false" aria-controls="collapseicon8">Followers</button>
                  </h5>
                </div>
                <div class="collapse" id="collapseicon8" aria-labelledby="collapseicon8" data-parent="#accordion" style="">
                  <div class="card-body social-list filter-cards-view">
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/2.png">
                      <div class="media-body"><span class="d-block">Bucky Barnes</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/3.png">
                      <div class="media-body"><span class="d-block">Sarah Loren</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/3.jpg">
                      <div class="media-body"><span class="d-block">Jason Borne</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/10.jpg">
                      <div class="media-body"><span class="d-block">Comeren Diaz</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/11.png">
                      <div class="media-body"><span class="d-block">Andew Jon</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-6 col-md-12 col-sm-6">
              <div class="card">
                <div class="card-header">
                  <h5 class="p-0">
                    <button class="btn btn-link ps-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseicon11" aria-expanded="false" aria-controls="collapseicon11">Followings</button>
                  </h5>
                </div>
                <div class="collapse" id="collapseicon11" aria-labelledby="collapseicon11" data-parent="#accordion" style="">
                  <div class="card-body social-list filter-cards-view">
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/3.png">
                      <div class="media-body"><span class="d-block">Sarah Loren</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/2.png">
                      <div class="media-body"><span class="d-block">Bucky Barnes</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/10.jpg">
                      <div class="media-body"><span class="d-block">Comeren Diaz</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/3.jpg">
                      <div class="media-body"><span class="d-block">Jason Borne</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                    <div class="media"><img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="/images/user/11.png">
                      <div class="media-body"><span class="d-block">Andew Jon</span><a href="javascript:void(0)">Add Friend</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-6 col-md-12 col-sm-6">
              <div class="card">
                <div class="card-header">
                  <h5 class="p-0">
                    <button class="btn btn-link ps-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseicon4" aria-expanded="false" aria-controls="collapseicon4">Latest Photos</button>
                  </h5>
                </div>
                <div class="collapse" id="collapseicon4" data-parent="#accordion" aria-labelledby="collapseicon4" style="">
                  <div class="card-body photos filter-cards-view">
                    <ul>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-1.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-2.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-3.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-4.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-5.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-6.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-7.png"></div>
                      </li>
                      <li>
                        <div class="latest-post"><img class="img-fluid" alt="" src="/images/social-app/post-8.png"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-lg-6 col-md-12 col-sm-6">
              <div class="card">
                <div class="card-header">
                  <h5 class="p-0">
                    <button class="btn btn-link ps-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseicon13" aria-expanded="false" aria-controls="collapseicon13">Friends</button>
                  </h5>
                </div>
                <div class="collapse" id="collapseicon13" data-parent="#accordion" aria-labelledby="collapseicon13" style="">
                  <div class="card-body avatar-showcase filter-cards-view">
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/3.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/5.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/1.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/2.png" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/3.png" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/6.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/10.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/14.png" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/1.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/4.jpg" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/11.png" alt="#"></div>
                    <div class="d-inline-block friend-pic"><img class="img-50 rounded-circle" src="/images/user/8.jpg" alt="#"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-12 col-md-7 xl-65">
        <div class="row">
          <!-- profile post start-->
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" @click="set_showRooms">
                    <div class="nav-link active" id="home-tab" data-bs-toggle="tab" role="tab"
                         aria-controls="home" aria-selected="true">Помещения</div>
                  </li>
                  <li class="nav-item">
                    <div class="nav-link" id="profile-tabs" data-bs-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">Собственики</div>
                  </li>
                  <li class="nav-item">
                    <div class="nav-link" id="contact-tab" data-bs-toggle="tab" role="tab" aria-controls="contact" aria-selected="false">Звонки</div>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div v-show="showRooms" class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <ItemRoom v-for="itemRooms in item.rooms" :key="itemRooms.uid" :item="itemRooms"  />
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <p class="mb-0 m-t-30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                  </div>
                  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <p class="mb-0 m-t-30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- profile post end-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemRoom from "~/components/Realestate/Address/itemRoom";
export default {
  name: "itemHouse",
  components: {ItemRoom},
  props:{
    item: {}
  },
  data () {
    return {
      showRooms: true
    }
  },
  methods: {
    set_showRooms (){
      this.showRooms = !this.showRooms
    }
  },
  computed: {
    guide() {
      return this.$store.getters['realestate/spr']
    }
  }
}
</script>

<style scoped>
  .row{
    padding: 13px;
  }
</style>
