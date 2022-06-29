<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        <div class="card profile-header bg-size"
             style="background-image: url(/bg/bgrealestate2.jpg); background-size: cover;
             background-position: center center; display: block;">
          <img class="img-fluid bg-img-cover" src="/assets/images/user-profile/bg-profile.jpg" alt=""
               style="display: none;">
          <div class="userpro-box">
            <div class="img-wrraper">
              <div class="avatar"><img class="img-fluid" alt="" src="/assets/images/user/7.jpg"></div>
              <a class="icon-wrapper" href="edit-profile.html">
                <i class="icofont icofont-pencil-alt-5"></i>
              </a>
            </div>
            <div class="user-designation">
              <div class="title">
                <a target="_blank" href="">
                <h4>{{item.name}}</h4>
                <!--
                <h6>{{item.tip}}</h6>
                -->
                </a>
              </div>
              <div class="follow">
                <ul class="follow-list">
                  <li>
                    <div class="follow-num counter">
                      <div v-if="item.houses">{{item.houses.length}}</div>
                      <div v-else>0</div>
                    </div><span>Зданий</span>
                  </li>
                  <li>
                    <div class="follow-num counter">450</div><span>Площадей</span>
                  </li>
                  <li>
                    <div class="follow-num counter">500</div><span>Собственников</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="text-align: end;cursor: pointer"><a  @click="showInfoclick()">Подробнее</a></div>
        </div>
      </div>
      <div v-show="showInfo" class="col-sm-12">
        <itemHouse v-for="itemHouse in item.houses" :key="itemHouse.uid" :item="itemHouse"></itemHouse>
      </div>

    </div>
  </section>
</template>

<script>
import ItemHouse from "~/components/Realestate/Address/itemHouse";
export default {
  name: "itemAddress",
  components: {ItemHouse},
  props:{
    item: {}
  },
  data () {
    return {
      showInfo: false
    }
  },
  methods:{
    showInfoclick() {
      this.showInfo = true;
    }
  }
}
</script>

<style scoped>

</style>
