import { defineStore } from "pinia";
import Chart from 'chart.js/auto'
import axios from "axios";


export const useMainStore = defineStore('useMainStore', {
  state: () => ({
    laoding: false,
    view: 'map',
    map: null,
    mapFit: 8,
    states: null,
    lgas: null,
    facilities: null,
    partners: null,
    programAreas: null,
    supportTypes: null,
    cso: 'all',
    mapData: {},
    chartData:null,
    chartMainContainerRef: null,
    chartDataKeys: null,
    chartCleanedData: [],
    mapGeoData: Object,
    baseUrl: 'https://resourcemapping.sydani.org/api/method/resourcemapping.data',
    apiMethod: '',
    mapContainerRef: null,
    geoJson: null,
    markerGeoJson: null,
    today: new Date(),
    mapTLayer: '',
    mapPointerHTML: '',
    mapInfo: L.control(),
    mapMarkers: null,
    lgaMapMarker: null,
    mapInfoProps: null,
    mapLegend: L.control({ position: 'bottomright' }),
    selectedMarker: null,
    selectedLgaMarker: null,
    selectedState: {},
    selectedLga: {},
    selectedPartners: {},
    selectedPrograms: {},
    selectedSupports: {},
    selectedStatus: {},
    selectedStartDate: '2020-01-01',
    selectedEndDate: '2030-12-31'
  }),

  actions: {

    login(email, password) {
      this.loginProcess = true;
      return axios.post(`${this.baseUrl}.login`, {
        'email': email, 'password': password
      })
    },

    generateChartLabels(e) {
      return this.barChartLabels.map((label, index) => ({
        text: label,
        fillStyle: this.getChartColors()[index]
      }))
    },

    formatDate(inputDate) {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const [year, month] = inputDate.split('-');
      const formattedDate = `${months[parseInt(month) - 1]} ${year}`;

      return formattedDate;
    },

    async logout(email) {
      const authUser = JSON.parse(localStorage.getItem('authUser'))
      localStorage.removeItem('authUser');
      const config = {
        headers: {
          Authorization: `token ${authUser.api_key}:${authUser.api_secret}`
        }
      }

      const data = { email: email }

      await axios.post(`${this.baseUrl}.logout`, data, config).then((res) => {
        localStorage.clear();
      });
    },

    getChartColors() {
      return ['#004346', '#7FDBFF', '#8F3985', '#FF6F61', '#4D8169', '#C64F4A', '#A15751',
        '#C2740B', '#4A8186', '#A43E37', '#002B2E', '#8F3A37'];
    },

    getDataObjAndColor(supportType, status) {
      let sptObj = this.getValFromData(
      this.supportTypes, 'name', supportType);
      return {
        label: supportType,
        type: 'bar',
        backgroundColor: sptObj.bg,
        borderColor: '#C2554F',
        data: []
      }
    },

    createChartData(data) {
      var t = this
      const labels = Object.keys(data.partners);
      const dataSets = []
      const dataSetData = []
      const supportTypes = {}

      for(let a = 0; a < labels.length; a++) {
        let pdt = labels[a];
        let spTypes = Object.keys(data.partners[pdt]);
        
        for(let b = 0; b < spTypes.length; b++) {
          const spt = spTypes[b];
          const supportData = data.partners[pdt][spt]
          t.chartCleanedData.push({
            'partner': pdt,
            'support': spt,
            'lgas_sp': supportData.lgas_supported,
            'status': supportData.status,
          });
        }
      };
      let checkIfLabelExists  = (label) => {
        for(let j = 0; j < dataSets.length; j++) {
          if(dataSets[j]['label'] == label) {
            return j;
          } else {
            return false;
          }
        }
      }
      t.chartCleanedData.forEach((d) => {
        let patIndx = labels.indexOf(d.partner);
        // dataSetData[labelIndex] = d.lgas_sp;
        let dtObj = t.getDataObjAndColor(d.support, d.status);
        dtObj['data'][patIndx] = 0;
        if(dataSets.length <= 0) {
          dtObj['data'][patIndx] = d.lgas_sp;
          dataSets.push(dtObj);
        } else {
          // dtObj['data'] = [d.lgas_sp];
          let exPatInd = checkIfLabelExists(d.support);

          if(exPatInd) {
            dataSets[exPatInd]['data'][patIndx] = d.lgas_sp;
          } else {
            dtObj['data'][patIndx] = d.lgas_sp;
            dataSets.push(dtObj);
          }
        }
      });
      // console.log(dataSets);
      return {
        labels: labels,
        datasets: dataSets
      }
    },

    getChartJsOptions(max) {
     
      // console.log(max);
      return {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 30,
          },
          x: {
            categoryPercentage: 0.7 // Adjust as needed (default: 0.8)
          }
        },
        // barThickness: 20
      }
    },

    fetch(url) {
      this.laoding = true;
      return axios.get(`${this.baseUrl}.${url}`);
    },

    async fetchStates() {
      await this.fetch('states').then(async (res) => {
        this.states = res.data.states;
        this.laoding = false;
      });
    },

    async fetchLgas() {
      let url = `lgas?state=${this.selectedState[this.view]}`
      await this.fetch(url).then(async (res) => {
        this.lgas = res.data.lgas;
        this.laoding = false;
      });
    },

    async fetchFacilities() {
      let st = this.selectedState[this.view];
      let url = `dh_facilities?state=${st}`
      await this.fetch(url).then(async (res) => {
        this.facilities = res.data.facilities;
        this.laoding = false;
      });
    },

    async fetchPartners() {
      await this.fetch('partners').then(async (res) => {
        this.partners = res.data.partners;
        this.laoding = false;
      });
    },

    async fetchPrograms() {
      await this.fetch('programs').then(async (res) => {
        this.programAreas = res.data.programs;
        this.laoding = false;
      });
    },

    async fetchSupportTypes() {
      await this.fetch('support_types').then(async (res) => {
        this.supportTypes = res.data.support_types;
        this.laoding = false;
      });
    },

    async fetchMapData() {
      let url = `support_duration?`
      let partners_param = '&partner=';
      let programs_param = '&program_area=';
      let support_param = '&support_types=';
      let status_param = '&status='
      let pts = this.selectedPartners[this.view];
      let prgs = this.selectedPrograms[this.view];
      let spts = this.selectedSupports[this.view];
      let stts = this.selectedStatus[this.view];

      pts.forEach((part) => {
        partners_param += `${part},`
      });

      prgs.forEach((part) => {
        programs_param += `${part},`
      });

      spts.forEach((sp) => {
        support_param += `${sp},`
      });

      let st = this.selectedState[this.view];
      let lg = this.selectedLga[this.view]
      if(this.view == 'chart') {
        url = `support_coverage?`
      }
      url += `state=${st}&lga=${lg}`
      url += programs_param
      url += partners_param
      url += support_param
      url += `&cso=${this.cso}`
      // date filter
      // url += `&start_date=${this.selectedStartDate}&end_date=${this.selectedEndDate}`
      
      await this.fetch(url).then(async (res) => {
        this.mapData[this.view] = null;
        this.mapData[this.view] = res.data;
        this.laoding = false;
      }).catch((error) => {
        console.log(error);
      });
    },

    async launchAapp() {
      await this.fetchStates();
      await this.fetchLgas();
      await this.fetchPartners();
      await this.fetchPrograms();
      await this.fetchSupportTypes();
      await this.fetchMapData();
      await this.fetchFacilities();
      this.laoding = false;
    },

    async updateApp() {
      await this.fetchMapData();
      if(this.view == 'map') {
        await this.loadGeoData();
        await this.mapMarkers.clearLayers();
        await this.markerGeoJson.clearLayers();
        await this.geoJson.clearLayers();
        await this.geoJson.addData(this.mapGeoData);
        await this.createMap();
        await this.createDataPoints();
      } else {
        // this.selectedPrograms = null;
        this.chartDataKeys = Object.keys(
          this.mapData[this.view]['data']
        );
        
        this.chartCleanedData = [];
      }
      this.laoding = false;
    },

    dateFilter() {
      let filter = '';
      if (this.dateFrom) {
        filter = `&dateFrom=${this.dateFrom}`;
        if (this.dateTo) {
          filter += `&dateTo=${this.dateTo}`;
        }
      }
      return filter
    },


    resetMapHighlight(e) {
      this.geoJson.resetStyle(e.target);
      this.mapInfo.update();
    },

    // Define a function for fade-in animation
    fadeInColor(element) {
      // Get the current opacity of the element
      var that = this;
      let opacity = parseFloat(L.DomUtil.getStyle(element, 'opacity'));
      // Increase the opacity by 0.1
      opacity += 0.02;
      // Set the new opacity to the element
      L.DomUtil.setOpacity(element, opacity);
      // Check if the opacity is less than 1
      if (opacity < 1) {
        // Request another animation frame and call the same function recursively
        L.Util.requestAnimFrame(function () {
          that.fadeInColor(element);
        });
      }
    },

    addLegend(type, cMap) {
      this.mapLegend.onAdd = (map) => {
        map._ldiv = L.DomUtil.create('div', 'legend');
        let grades = this.getGrades(type);
        for (var i = 0; i < grades.length; i++) {
          map._ldiv.innerHTML += `<i style="background: ${this.getColor(grades[i], 'reached')};"></i> 
          - ${grades[i]} <br>
          `;
        }

        return map._ldiv;
      }
      this.mapLegend.addTo(cMap);
    },

    createGradesByTotal(num) {
      const totalElements = 5;
      const stepSize = Math.round(num / (totalElements - 1));
      const numberArray = Array.from({ length: totalElements }, (_, i) => i * stepSize);
      return numberArray;
    },

    getGrades(type) {
      let grades = ['0-49', '50-79', '80-99', '100+'];

      return grades;
    },

    layerStyle(feature) {
      return {
        fillColor: '#98A94A',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
      }
    },

    highlightMapFeature(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 1,
        color: '#98A94A',
        dashArray: '',
        fillOpacity: 0.8
      });

      L.DomUtil.setOpacity(e.target._path, 0.5);
      this.fadeInColor(e.target._path);
      layer.bringToFront();

      this.mapInfo.update(layer.feature.properties);
    },

    fitBounds(geo) {
      // this.map.setView(geo.getBounds().getCenter(), this.mapFit);
      this.map.fitBounds(geo.getBounds());
    },

    async zoomToMapFeature(e) {
      let dataSet = e.target.feature.properties;
      let mpd = this.mapData[this.view];
      this.selectedMarker = null;
      
      if(this.selectedState) {
        dataSet['supports'] = mpd.data[dataSet.state][dataSet.LGA];
        this.selectedLgaMarker = dataSet;
      }
      
      this.map.flyToBounds(e.target, { duration: 0.2 } );
    },

    mapInfoOnUpdate(props) {
      if (props) {
        this.mapInfoProps = props;
      } else {
        this.mapInfoProps = null;
      }
    },

    mapLegendOnAdd(map) {
      map._ldiv = L.DomUtil.create('div', 'legend');

      // let grades = this.getGrades();

      // for (var i = 0; i < grades.length; i++) {
      //   map._ldiv.innerHTML +=
      //     '<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
      //     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      // }

      return map._ldiv;
    },

    getValFromData(dataObj, field, match) {
      for(let i = 0; i < dataObj.length; i++) {
        if(dataObj[i][field] == match) {
          return  dataObj[i];
        }
      }
      return null
    },  

    async loadMapGeometry(data) {
      this.mapGeoData = {
        'type': 'FeatureCollection',
        'features': []
      }

      data.forEach((d) => {

        let geoCords = JSON.parse(d.geometry);
        this.mapGeoData.features.push({
          'type': 'Feature',
          'id': d.lga,
          'properties': {
            'state': d.state,
            'LGA': d.lga
          },
          'geometry': geoCords
        });
      });
    },

    generatePoints(mapGeometry, numPoints) {
      // Parse the GeoJSON polygon data
      const polygon = JSON.parse(mapGeometry);
    
      // Function to generate a random point within a polygon
      function getRandomPointInPolygon(polygon, retries) {
        const coordinates = polygon.coordinates[0];
        const minX = Math.min(...coordinates.map(point => point[0]));
        const maxX = Math.max(...coordinates.map(point => point[0]));
        const minY = Math.min(...coordinates.map(point => point[1]));
        const maxY = Math.max(...coordinates.map(point => point[1]));
    
        // Generate random values within the polygon bounds
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;
    
        // Check if the point is inside the polygon using the Ray Casting algorithm
        // let inside = false;
        // for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        //   const xi = coordinates[i][0], yi = coordinates[i][1];
        //   const xj = coordinates[j][0], yj = coordinates[j][1];
    
        //   const intersect = ((yi > randomY) != (yj > randomY)) &&
        //     (randomX < (xj - xi) * (randomY - yi) / (yj - yi) + xi);
    
        //   if (intersect) inside = !inside;
        // }
        
        return [randomX, randomY];
      }
    
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push(getRandomPointInPolygon(polygon));
      }
    
      return points;
    },

    closePopup() {
      this.selectedLgaMarker = null;
      this.selectedMarker = null;
    },

    markerEvent(e) {
      this.selectedLgaMarker = null;
      this.selectedMarker = e.target.feature.properties;
    },

    async createDataPoints() {
      var that = this;
      let mpd = this.mapData[this.view].data;
      var layerGeoJson = {
        'type': 'FeatureCollection',
        'features': [

        ]
      }

      for (const state in mpd) {
        let stateObj = mpd[state];
        // let stateInfo = await this.getValFromData(
        //   this.states, 'state', state
        // );
        
      
        if(this.selectedState) {
          for(const lga in stateObj) {
            let lgaObj = stateObj[lga];
            let lgaFacilities = that.facilities.filter(facility => facility.lga === lga);
  
            lgaObj.forEach(async (row) => {
        
              let bg = await that.getValFromData(that.supportTypes, 'name', row.type_of_support).bg;
              
              let len = lgaFacilities.length;
              let randomIndex = Math.floor(Math.random() * len);
              let randFacility = lgaFacilities[randomIndex];
              let randGeo = JSON.parse(randFacility.geometry);
              let mhtml = ''
            
              if(row.status == 'Ongoing') {
                mhtml = `
                <div class="shadow-sm w-3 h-3 rounded-full" style="background: ${bg};"></div>
                `
              } else if(row.status == 'Completed') {
                mhtml = `
                <div class="shadow-sm w-3 h-3" style="background: ${bg};"></div>
                `
              } else {
                mhtml = `
                <b class="w-0 h-0 
                  border-l-[10px] border-l-transparent
                  border-b-[15px] border-b-[${bg}]
                  border-r-[10px] border-r-transparent">
                </b>
                `
              }
             
              layerGeoJson.features.push({
                'type': 'Feature',
                'properties': {
                  'state': state,
                  'lga': lga,
                  'program_area': row.program_area,
                  'partner': row.partner,
                  'type_of_support': row.type_of_support,
                  'cso_support': row.cso_support,
                  'start_date': row.start_date,
                  'end_date': row.end_date,
                  'status': row.status,
                  'duration_in_months': row.duration_in_months,
                  'remaining_months': row.remaining_months,
                  'html': mhtml
                },
                'geometry': randGeo
              });
              
              if(that.markerGeoJson) {
                this.markerGeoJson.clearLayers();
              }

              // let mapMarkerIcon = L.divIcon({
              //   html: that.mapPointerHTML,
              //   popupAnchor: [0, 200]
              // });
              
              that.markerGeoJson = L.geoJSON(layerGeoJson, {
                pointToLayer: function(feature, latlng) {
                  return L.marker(latlng, {
                    icon: L.divIcon({
                      className: 'facilities-marker',
                      html: feature.properties.html,
                      popupAnchor: [0, 200]
                    })
                  }).on('click', that.markerEvent)
                }
              }).addTo(that.map);

            });
          }
        }
        
      }

      // for (let i = 0; i < numPoints; i++) {
        // let randomLat = geometryData.coordinates[0][0][1] + (geometryData.coordinates[0][2][1] - geometryData.coordinates[0][0][1]) * Math.random();
        // let randomLng = geometryData.coordinates[0][0][0] + (geometryData.coordinates[0][2][0] - geometryData.coordinates[0][0][0]) * Math.random();
        // let point = L.latLng(randomLat, randomLng);
    
        // Check if the point falls within the polygon
        // if (polygon.getBounds().contains(point)) {
        //     dataPoints.push({
        //         latlng: point,
        //         popupText: 'Data Point ' + (i + 1)
        //     });
        // }
      // }

      // return dataPoints;
    },

    async loadGeoData() {
      if(this.selectedState[this.view]) {
        this.mapFit = 8;
        this.loadMapGeometry(this.lgas);
      }
    },

    resetlgaMapHighlight(e) {
      this.geoJson.resetStyle(e.target);
      this.mapInfo.update();
    },

    onEachMapFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightMapFeature,
        mouseout: this.resetMapHighlight,
        click: this.zoomToMapFeature
      });

      // let bounds = layer.getBounds().getCenter();

      // let icon = L.divIcon({
      //   iconSize: null,
      //   iconAnchor: [25, 10],
      //   html: `<small class="ml-1 mr-1" id="layer-name-label">
      //     ${feature.properties.State ? feature.properties.State : feature.properties.LGA}
      //   </small>`
      // });

      // L.marker(bounds, { icon: icon }).addTo(this.mapMarkers);

      // L.marker(pos).addTo(this.map);

      // this.mapMarker = L.marker(bounds, { icon: icon })
      // console.log(this.mapMarker);
      // // this.mapMarker.addTo(this.map);
    },

    createMap() {
      if (this.map == null) {
       
        this.map = L.map(this.mapContainerRef, {
          zoomSnap: 0.1
        });
        // this.map.zoomControl.remove();

        // this.map = L.map(this.mapContainerRef, {
        //   center: [9.0820, -8.6753],
        //   zoom: 10,
        //   layers: [osm, cities]
        // });

        // Disable zooming using the mouse scroll wheel
        this.map.scrollWheelZoom.disable();
        // this.map.dragging.disable();
        // Disable zooming using the keyboard
        this.map.keyboard.disable();

        // this.map = L.map(this.mapContainerRef, {
        //   center: [9.0820, -8.6753],
        //   zoom: 10
        // });

        //  BING MAP -------------------------------------------------------
        // let mapOptions = {
        //   bingMapsKey: 'AuK9vIKcd-EyPqkaZlpxbUVnHWjAFosBxHqsUaVbMCXMbtRhSmJ3GPEAcTOLIJP-',
        //   imagerySet: 'Aerial',
        //   // style: mapStyle
        // }

        // L.tileLayer.bing(mapOptions).addTo(this.map)

        // ----------------------------------------------------------------
        // let doms = ['mt0'];

        // let googleDomains = ['mt0', 'mt1', 'mt2', 'mt3'];

        // L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        //   maxZoom: 20,
        //   subdomains: googleDomains
        // }).addTo(this.map);

        // L.Layer.Highlight().do({ q: 'Piotrkowska, Łódź' }).addTo(map);

        // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        //   attribution: 'Map data © <a href="https://www.mapbox.com/">Mapbox</a>',
        //   maxZoom: 18,
        //   id: 'mapbox/satellite-v9',
        //   tileSize: 512,
        //   zoomOffset: -1,
        //   accessToken: 'pk.eyJ1Ijoia2FtZWVuIiwiYSI6ImNsZmNkN29xbjBqOGkzcnBnNmc4Y3ZvNXUifQ.UIK85teOqZAyZ66SZMH0Rg'
        // }).addTo(this.map);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   maxZoom: 19,
        //   attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        // }).addTo(this.map);
        
        

        // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // }).addTo(this.map);

        // pk.eyJ1Ijoia2FtZWVuIiwiYSI6ImNsZmNkN29xbjBqOGkzcnBnNmc4Y3ZvNXUifQ.UIK85teOqZAyZ66SZMH0Rg

        // L.mapboxGL({
        //   accessToken: 'pk.eyJ1Ijoia2FtZWVuIiwiYSI6ImNsZmNkN29xbjBqOGkzcnBnNmc4Y3ZvNXUifQ.UIK85teOqZAyZ66SZMH0Rg'
        // }).addTo(map);

        // // add a 3D building layer to the map
        // L.mapboxGL({
        //   accessToken: 'pk.eyJ1Ijoia2FtZWVuIiwiYSI6ImNsZmNkN29xbjBqOGkzcnBnNmc4Y3ZvNXUifQ.UIK85teOqZAyZ66SZMH0Rg',
        //   style: 'mapbox://styles/mapbox/buildings-v1',
        //   interactive: true
        // }).addTo(this.map);



        // var mapLink = '<a href="http://www.esri.com/">Esri</a>';
        // var wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        // L.tileLayer(
        //   'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        //   attribution: '&copy; ' + mapLink + ', ' + wholink,
        //   maxZoom: 18,
        // }).addTo(this.map);

        // L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        //   maxZoom: 20,
        //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        // }).addTo(this.map);

        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }).addTo(this.map);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        }).addTo(this.map);

        // L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        // }).addTo(this.map);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        //   minZoom: 6
        // }).addTo(this.map);

        // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        //   attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        //   maxZoom: 18,
        //   id: 'mapbox/streets-v11',
        //   tileSize: 512,
        //   zoomOffset: -1,
        //   accessToken: 'pk.eyJ1Ijoia2FtZWVuIiwiYSI6ImNsZmNkN29xbjBqOGkzcnBnNmc4Y3ZvNXUifQ.UIK85teOqZAyZ66SZMH0Rg'
        // }).addTo(this.map);

        this.mapInfo.update = this.mapInfoOnUpdate;
        // this.mapLegend.onAdd = this.mapLegendOnAdd;
        // this.mapInfo.addTo(this.map);
        // this.mapLegend.addTo(this.map);

        this.mapMarkers = L.layerGroup();
        this.mapMarkers.addTo(this.map);
        
        this.geoJson = L.geoJson(this.mapGeoData, {
          style: this.layerStyle,
          onEachFeature: this.onEachMapFeature
        }).addTo(this.map);

      } else {
        // this.mapMarker.remove();
        // this.mapMarker.addTo(this.map);
        this.mapMarkers.clearLayers();
        this.geoJson.clearLayers();
        this.geoJson.addData(this.mapGeoData);
      }

      // this.mapTlayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // });
      
      this.fitBounds(this.geoJson);
      this.map.setMaxBounds(this.geoJson.getBounds());
    }

  },
});