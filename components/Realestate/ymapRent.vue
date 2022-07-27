<template>
  <div ref="map" class="main"></div>
</template>

<script>

export default {
  name: "ymapRent",
  mounted() {
    this.resize();
    window.ymaps.ready(()=> {
      const myMap = new window.ymaps.Map(this.$refs.map, {
        center: [55.76, 37.64],
        zoom: 13
      });
    });
    window.addEventListener('resize', this.resize);


    this.$api.get('/api/map',{}).then(items =>{
      console.log(items.data)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  methods:{
    resize(){
      const h = window.innerHeight - this.$refs.map.getBoundingClientRect().top;
      const w = window.innerWidth - this.$refs.map.getBoundingClientRect().left;
      this.$refs.map.style.height = (h- 70) + 'px';
      // this.$refs.map.style.width = (w -70) + 'px';
      console.log(this.$refs.map.left)
    }

  },
}
</script>

<style scoped>
  .main{
    min-height: 300px;
  }
</style>
