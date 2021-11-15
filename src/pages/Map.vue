<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    let script = document.createElement('script')
    script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=e765ee2c909344df70d61e4a6852adc5&plugin=AMap.PlaceSearch'
    script.onload = this.initMap
    document.head.append(script)
    this.script = script
  },
  destroyed () {
    this.script.remove()
  },
  methods: {
    initMap () {
      let AMap = window.AMap
      console.log(AMap)
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12,
        viewMode: '3D',
        center:[110.347124,21.268979],
        layers:[
            new AMap.TileLayer.RoadNet({
                zIndex:20
            })
        ]
      });
      new AMap.PlaceSearch({
          extensions:'all',
          subdistrict:0
      }).search('岭南师范学院',function(status,result){
        console.log(result)
          // 外多边形坐标数组和内多边形坐标数组
          var outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
          ];
          var holes = result.districtList[0].boundaries

          var pathArray = [
              outer
          ];
          pathArray.push.apply(pathArray,holes)
          var polygon = new AMap.Polygon( {
              pathL:pathArray,
              strokeColor: '#00eeff',
              strokeWeight: 1,
              fillColor: '#71B3ff',
              fillOpacity: 0.5
          });
          polygon.setPath(pathArray);
          map.add(polygon)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 500px;
}
</style>