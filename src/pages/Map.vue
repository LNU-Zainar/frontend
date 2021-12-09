<template>
  <div class="map">
    <div id="container"
      v-loading="isLoading"
      element-loading-text="地图加载中"
      element-loading-background="#1a232c">
    </div>
  </div>
</template>

<script>
import path from './path.json'
import * as api from '@/common/api'
/* global AMap */

export default {
  data () {
    return {
      isLoading: true,
      locations: []
    }
  },
  mounted () {
    this.map = null
    this.infoWindow = null

    Promise.all([
      this.loadSDK().then(this.initMap),
      this.fetchData()
    ]).then(() => {
      this.addMarkers()
    }).finally(() => {
      this.isLoading = false
    })
  },
  destroyed () {
    this.script.remove()
    if (this.map) {
      this.map.destroy()
    }
  },
  methods: {
    fetchData () {
      return api.getMapLocation(null, {
        notifyType: 'f'
      }).then(data => {
        this.locations = data
      })
    },
    loadSDK () {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = 'https://webapi.amap.com/maps?v=2.0&key=e765ee2c909344df70d61e4a6852adc5'
        script.onload = resolve
        script.onerror = reject
        document.head.append(script)
        this.script = script
      })
    },
    initMap () {
      const bounds = [path.map(item => [item.R, item.Q])]

      const map = new AMap.Map('container', {
        // mask: bounds,
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        showLabel: true,
        labelzIndex: 999,
        rotation: 0,
        zoom: 16,
        viewMode:'2D',
        pitch: 50,
        center: [110.347924, 21.268779],
        mapStyle: 'amap://styles/grey',
        layers: [
          new AMap.createDefaultLayer({
            visible: true,
            zIndex: 0
          }),
          new AMap.Buildings({
            zIndex: 9,
            heightFactor: 2
          })
        ]
      })

      const infoWindow = new AMap.InfoWindow({
        position: location.position,
        anchor: 'top-left'
      })

      const area = new AMap.Polygon({
        zIndex: 1,
        path: bounds,
        strokeColor: '#0066ff',
        strokeWeight: 2,
        fillColor: '#71B3ff',
        fillOpacity: .2
      })
      map.add(area)

      this.infoWindow = infoWindow
      this.map = map
    
      // const outer = [
      //   new AMap.LngLat(-360,90,true),
      //   new AMap.LngLat(-360,-90,true),
      //   new AMap.LngLat(360,-90,true),
      //   new AMap.LngLat(360,90,true)
      // ]
      // const pathArray = [outer, ...bounds]
      // const mask = new AMap.Polygon({
      //   zIndex: 1,
      //   pathL: pathArray,
      //   strokeColor: '#0066ff',
      //   strokeWeight: 1,
      //   fillColor: '#71B3ff',
      //   fillOpacity: .5
      // })
      // mask.setPath(pathArray)
      // map.add(mask)
    },
    addMarkers () {
      const infoWindow = this.infoWindow
      const map = this.map

      const markerOver = (e) => {
        infoWindow.setContent(e.target._originOpts.infoContent)
        infoWindow.open(map, e.target.getPosition())
      }

      const markerOut = () => {
        infoWindow.close(map)
      }

      const markerClick = (e) => {
        const location = e.target._originOpts.location
        this.$router.push({
          name: 'index',
          query: {
            location: location.location_id
          }
        })
      }

      this.locations.forEach(item => {
        if (!item.items_total) {
          return false
        }
        const markerContent = `
        <div class="map-marker">
          <div class="${item.items_total ? 'map-marker-img' : 'map-marker-img is-empty'}">
            ${item.items_total ? (item.items_total > 99 ? '99+' : item.items_total) : ''}
          </div>
          <div class="map-marker-label">
            ${item.location_name}
          </div>
        </div>
        `
        
        const infoContent = item.items_total
         ? `
        <div class="info-window">
          <h6 class="location-name">${item.location_name}</h6>
          <p class="detail">
            共有<strong class="count">${item.items_total}</strong>件物品正在招领
          </p>
        </div>
        `
        : `
        <div class="info-window">
          <h6 class="location-name">${item.location_name}</h6>
          <p class="detail">
            暂无物品招领信息
          </p>
        </div>
        `

        const marker = new AMap.Marker({
          content: markerContent,
          anchor: 'bottom-left',
          infoContent,
          location: item,
          position: item.position,
          offset: new AMap.Pixel(-12, 0)
        })

        marker.on('mouseover', markerOver)
        marker.on('mouseout', markerOut)
        marker.on('click', markerClick)

        map.add(marker)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  background: #1a1a1a;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
}
</style>
