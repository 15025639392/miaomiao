//将shp文件的数据坐标系由GCJ-02改为WGS-84
const gcoord = require('gcoord');
const gdal = require("gdal-async");
const path = require('path')
const turf = require('@turf/turf')
const Service = require('egg').Service

class WaterService extends Service {
    get Water() {
        // this.app.model.Water.index({location: '2dsphere'});
        return this.app.model.Water
    }

    async getwater(){
        let {lng,lat,maxDistance=5000,minDistance=0,crs='gcj02',pageNow=1,pageSize=20} = this.ctx.request.query;
        pageNow = Number.parseInt(pageNow)
        pageSize = Number.parseInt(pageSize)
        const ts = gcoord.transform([lng,lat], gcoord.GCJ02,gcoord.WGS84);
        let skip = (pageNow-1)*pageSize
        const condition = {
            location: {
               $near: {
                  $geometry: {
                     type : "Point",
                     coordinates:ts
                  },
                  $maxDistance: maxDistance,
                  $minDistance: minDistance
               }
            }
          }
        const find = await this.Water.find(condition)
        // .skip(skip).limit(pageSize).lean()
        return find.map(r=> {
            const coords = r.location.coordinates[0]
            console.log(this.ctx.helper.getNumberId(r._id),r._id)
            const feature = {
                properties:{
                    name:r.name||'',
                    id:this.ctx.helper.getNumberId(r._id),
                    _id:r._id
                },
                geometry:{
                    type:'Point',
                    coordinates:coords[Math.floor(coords.length/2)]
                },
                type:'Feature'
            }
            // const feature = turf.center(r.location,{
            //     properties:{
            //         name:r.name||'',
            //         id:this.ctx.helper.getNumberId(r._id),
            //         _id:r._id
            //     }
            // })
            feature.properties.distance =  Math.ceil(turf.distance(turf.point(ts),feature, {units: 'kilometers'})*100)/100
            return gcoord.transform(feature,gcoord.WGS84, gcoord.GCJ02);
        })
    }

    async testGrib2() {
        //r只读  r+读取修改增加  w创建, ESRI Shapefile即shp格式的全称
        let dataset = gdal.open(path.resolve(__dirname, "../../china-latest-free/gfs.t00z.pgrb2.0p25.grib2"));
        //获取shp文件的第一个图层，我们的这个地图只有一个图层所以layers.get(0)即可
        let layer = dataset.layers;
       
        // //获取图层的的数据记录数，看看有没有正确读取到
        // console.log("number of features: " + layer.features.count());
        // const count = layer.features.count()
        //  console.log(dataset)
         const GT = dataset.geoTransform
         var Xgeo = GT[0] + 1440*GT[1] + 720*GT[2];
         var Ygeo = GT[3] + 1440*GT[4] + 720*GT[5];
        //  console.log(Xgeo,Ygeo)
         for await (const band of dataset.bands) {
            for (const test of band.pixels) {
                console.log(test)
                
            }
        }
        // for (let index = 0; index < count; index++) {
        //     const feature = layer.features.get(index);
        //     var geojson = JSON.parse(feature.getGeometry().toJSON());
        //     console.log(geojson)
        //     // gcoord.transform(geojson, gcoord.WGS84, gcoord.GCJ02);
        //     // if (geojson.type === 'MultiPolygon') {
        //     //     const flat = turf.flatten(geojson)
        //     //     let name = JSON.parse(feature.fields.toJSON()).name
        //     //     const features = flat.features
        //     //     for (let a = 0; a < features.length; a++) {
        //     //         const feature = features[a];
        //     //         const water = new this.Water({
        //     //             name: name,
        //     //             location: feature.geometry
        //     //         })
        //     //         await water.save()
        //     //     }
        //     // } else {
        //     //     const water = new this.Water({
        //     //         name: JSON.parse(feature.fields.toJSON()).name,
        //     //         location: geojson
        //     //     })
        //     //     await water.save()
        //     // }
        // }
        return 'ok'
    }

    async initWater() {
        //r只读  r+读取修改增加  w创建, ESRI Shapefile即shp格式的全称
        let dataset = gdal.open(path.resolve(__dirname, "../../china-latest-free/gis_osm_water_a_free_1.shp"));
        //获取shp文件的第一个图层，我们的这个地图只有一个图层所以layers.get(0)即可
        let layer = dataset.layers.get(0);
        // //获取图层的的数据记录数，看看有没有正确读取到
        // console.log("number of features: " + layer.features.count());
        const count = layer.features.count()
        for (let index = 0; index < count; index++) {
            const feature = layer.features.get(index);
            var geojson = JSON.parse(feature.getGeometry().toJSON());
            // gcoord.transform(geojson, gcoord.WGS84, gcoord.GCJ02);
            if (geojson.type === 'MultiPolygon') {
                const flat = turf.flatten(geojson)
                let name = JSON.parse(feature.fields.toJSON()).name
                const features = flat.features
                for (let a = 0; a < features.length; a++) {
                    const feature = features[a];
                    const water = new this.Water({
                        name: name,
                        location: feature.geometry
                    })
                    await water.save()
                }
            } else {
                const water = new this.Water({
                    name: JSON.parse(feature.fields.toJSON()).name,
                    location: geojson
                })
                await water.save()
            }
        }
        return 'ok'
    }
}


module.exports = WaterService