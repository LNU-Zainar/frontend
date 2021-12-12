<template>
  <div :class="['map', {'is-complete': isMapComplete}]">
    <div id="container"
      v-loading="isLoading"
      element-loading-text="地图加载中"
      element-loading-background="transparent">
    </div>
    <div class="left-bottom" v-if="isMapComplete">
      <div class="line-item">
        <el-button-group>
          <el-button size="mini" icon="el-icon-position" @click="positionOrigin">
            <!-- 原点 -->
          </el-button>

          <el-button size="mini" icon="el-icon-refresh" :loading="isRefreshLoading" @click="refreshData">
            <!-- 刷新 -->
          </el-button>

          <!-- <el-button size="mini" :icon="showAllLocation ? 'el-icon-open' : 'el-icon-turn-off'" @click="showAllLocation=!showAllLocation">
            {{ showAllLocation ? '隐藏空地点' : '显示空地点' }}
          </el-button> -->
        </el-button-group>
      </div>

      <div class="line-item">
        显示全部地点
        <el-switch
          :disabled="isLoading"
          v-model="showAllLocation"
          active-color="#13ce66"
          inactive-color="gray">
        </el-switch>
      </div>
    </div>
    
  </div>
</template>

<script>
import mapAreaPath from '@/assets/mapAreaPath.json'
import * as api from '@/common/api'
import AMapLoader from '@amap/amap-jsapi-loader'
/* global AMap */

export default {
  data () {
    const showAllLocation = localStorage.getItem('showAllLocation')

    return {
      isLoading: true,
      isRefreshLoading: false,
      isMapComplete: false,
      locations: [],
      showAllLocation: showAllLocation === 'true'
    }
  },
  mounted () {
    this.map = null
    this.infoWindow = null
    this.markers = []

    Promise.all([
      this.initMap().then(this.onMapComplete).catch(() => {
        this.$message.error('地图加载失败')
      }),
      this.fetchData(null, {
        notifyType: ''
      })
      .catch(() => {
        this.$message.error('数据获取失败')
      })
    ]).finally(() => {
      this.isLoading = false
    })
  },
  destroyed () {
    if (this.map) {
      this.map.destroy()
    }
  },
  watch: {
    showAllLocation (showAllLocation) {
      localStorage.setItem('showAllLocation', showAllLocation)

      this.markers.forEach(marker => {
        if (!marker._originOpts.hasItems) {
          if (showAllLocation) {
            marker.show()
          } else {
            marker.hide()
          }
        }
      })
    },
    locations () {
      if (this.map) {
        this.removeMarkers()
        this.addMarkers()
      }
    }
  },
  methods: {
    refreshData () {
      this.isRefreshLoading = true
      this.fetchData().finally(() => {
        this.isRefreshLoading = false
      })
    },
    fetchData () {
      return api.getMapLocation(null, {
        notifyType: 'f'
      }).then(data => {
        this.locations = data
      })
    },
    async initMap () {
      if (!window.AMap) {
        await AMapLoader.load({
          key: 'e765ee2c909344df70d61e4a6852adc5',
          version: '2.0',
          plugins: [],
          // AMapUI: {
          //   version: '1.1',
          //   plugins: []
          // },
          // Loca: {
          //   version: '2.0'
          // },
        })
      }
      const bounds = [mapAreaPath.map(item => [item.R, item.Q])]

      const map = new AMap.Map('container', {
        // mask: bounds,
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        labelzIndex: 999,
        zoom: 16,
        zooms: [14, 20],
        viewMode:'2D',
        pitch: 50,
        rotation: 0,
        showLabel: true,
        isHotspot: false,
        features: ['bg','point','road','building'],
        center: [110.347924, 21.268879],
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

      const area = new AMap.Polygon({
        zIndex: 1,
        path: bounds,
        strokeColor: '#0066ff',
        strokeWeight: 2,
        fillColor: '#71B3ff',
        fillOpacity: .2
      })
      map.add(area)

      return new Promise((resolve, reject) => {
        map.on('complete', () => {
          resolve(map)
        })
        map.on('error', reject)
      })
    },
    async onMapComplete (map) {
      this.map = map
      this.infoWindow = new AMap.InfoWindow({
        anchor: 'top-left'
      })
      this.addMarkers()
      this.positionOrigin()
      return new Promise(resolve => {
        setTimeout(() => {
          this.isMapComplete = true
          resolve()
        })
      })
    },
    positionOrigin () {
      if (this.map) {
        const immediately = this.isMapComplete
          ? false : true
        this.map.setFitView(null, immediately, [50, 50, 50, 50])
      }
    },
    removeMarkers () {
      this.markers.forEach(marker => {
        marker.remove()
      })
      this.markers = []
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
          visible: this.showAllLocation || Boolean(item.items_total),
          content: markerContent,
          anchor: 'bottom-left',
          infoContent,
          location: item,
          hasItems: Boolean(item.items_total),
          position: item.position,
          offset: new AMap.Pixel(-12, 0)
        })

        marker.on('mouseover', markerOver)
        marker.on('mouseout', markerOut)
        marker.on('click', markerClick)

        map.add(marker)
        this.markers.push(marker)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  max-width: 100%;
  margin: 0;
}
#container {
  width: 100%;
  height: 100%;
  background-color: #1a232c;
}
.left-bottom {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 14px;
  color: rgba(255,255,255, .8);
  text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black,0 -1px 0 black;
  .line-item {
    margin-top: 10px;
  }
}
</style>
