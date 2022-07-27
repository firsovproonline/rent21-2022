<template>
  <div ref="map" class="main"></div>
</template>

<script>

export default {
  name: "ymapRent",
  data: () => ({
    myMap: {}
  }),

  mounted() {
    this.resize();
    window.ymaps.ready(()=> {
      this.myMap = new window.ymaps.Map(this.$refs.map, {
        center: [55.76, 37.64],
        zoom: 13
      });
      this.$api.get('/api/map',{}).then(items =>{
        const clusterer = new window.ymaps.Clusterer();
        items.data.forEach(item=>{
          console.log(item)
          const myPlacemark = new window.ymaps.Placemark(
            // Координаты метки
            [item.LNG, item.LAT], {
              preset: 'islands#circleIcon',
              iconColor: '#3caa3c',
              id: item.uid,
            }, {
              preset: 'islands#circleIcon',
              iconColor: '#3caa3c'
            }
          );
          clusterer.add(myPlacemark);
        })
        this.myMap.geoObjects.add(clusterer);
      })
    });
    window.addEventListener('resize', this.resize);
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
