var uv = document.getElementsByClassName("my-paragraph");

var _LOCATION = {};
var _UV_INDEX = "";
var popup = "";
function LoadMap() {
    var map = "";
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjdmluaGxlIiwiYSI6ImNrZncxam14azB2Z2ozMG40Mm5nY2s2NmgifQ.Wm6ecYirD3Yilp0OUeX-Vw';
    map = new mapboxgl.Map({
        container: 'my-uv-map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [144.946457, -37.840935],
        zoom: 8
    });
    return map;
}


function LoadGeocode() {
    var geocoder = "";
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjdmluaGxlIiwiYSI6ImNrZncxam14azB2Z2ozMG40Mm5nY2s2NmgifQ.Wm6ecYirD3Yilp0OUeX-Vw';
    geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });
    return geocoder;
}

function GenerateTip(_uvi) {
    if (_uvi <= 2) {
        return {
        			condition:"Low UV danger.",
        			color:"Green",
        			advice:"No sun protection required! Consider sunscreen and sunglasses on bright days.",
        			equipment: ["http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunscreen_4193660.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunglasses_184785.png"]
        		};
    } else if (_uvi > 2 && _uvi <= 5) {
        return {
        			condition:"Moderate UV dange",
        			color:"#ffeb3b",
        			advice:"Slip, slop, slap, seek, slide! Wear sunscreen, sunglasses, protective clothing, and seek shade during the middle of the day.",
        			equipment: ["http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunscreen_4193660.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunglasses_184785.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_long-sleeve-shirt_739476.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_hat_1454597.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Tree_1776914.png"]
        		};
    } else if (_uvi > 5 && _uvi <= 7) {
        return {
        			condition:"High UV danger",
        			color:"orange",
        			advice:"Slip, slop, slap, seek, slide!! Always wear sunscreen, sunglasses, protective clothing, seek shade when outside, and reduce time in the sun where possible.",
        			equipment: ["http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunscreen_4193660.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunglasses_184785.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_long-sleeve-shirt_739476.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_hat_1454597.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Tree_1776914.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Umbrellar_1806967.png"]
        		};
    } else if (_uvi > 7 && _uvi <= 10) {
        return {
        			condition:"Very high UV danger",
        			color:"Red",
        			advice:"Slip, slop, slap, seek, slide!!! Unprotected skin and eyes will burn quickly. Always wear sunscreen, sunglasses, protective clothing, seek shade when outside, reduce time in the sun where possible, and avoid the sun 10am-2pm.",
        			equipment: ["http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunscreen_4193660.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunglasses_184785.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_long-sleeve-shirt_739476.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_hat_1454597.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Tree_1776914.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Umbrellar_1806967.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_House_740766.png"]
        		};
    } else if (_uvi > 11) {
        return {
        			condition:"Extreme UV danger",
        			color:"Violet",
        			advice:"Slip, slop, slap, seek, slide!!!! Unprotected skin and eyes will burn in minutes. Always wear sunscreen, sunglasses, protective clothing, seek shade when outside, reduce time in the sun where possible, and avoid the sun 10am-2pm.",
        			equipment: ["http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunscreen_4193660.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Sunglasses_184785.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_long-sleeve-shirt_739476.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_hat_1454597.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Tree_1776914.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_Umbrellar_1806967.png",
        						"http://www.brunneis.ml/wp-content/uploads/2021/08/noun_House_740766.png"]
        		};
    }
}

function RenderGeocoder(_map,_geocode){
 var local_uvi="";
var lng;
var lat;
document.getElementById("mapbox-search-container").appendChild(_geocode.onAdd(_map));
    geocoder.on('result', function (e) {
try{
	popup= popup.remove();
}catch(err){
	console.log(err);
}finally {
	console.log(e.result);
        var latlong = e.result.center;
        lng = e.result.center[0];
        lat = e.result.center[1];
        CallUvIndex(lng,lat).then((res)=>{
	local_uvi = res;
            RenderTip(res);
		AddPopUp(lng,lat,local_uvi,_map);
        })
    }

 }) 
      
}


function AddPopUp(_lng, _lat, _uvi,_map) {
    _map.on('click', function (e) {
        try {
            popup.remove();
        } catch (err) {
            console.log(err);
        } finally {
            console.log(_uvi);
            popup = new mapboxgl.Popup({ offset: 25 }).setLngLat([_lng, _lat]).setHTML(`<p class="popup-text">According to Open Weather Map</p>
            																			<h5 class="popup-heading">Uv Index: ${_uvi}</h5> 
            																			<a href="https://www.brunneis.ml/what-is-uv/">Click here to know Uv index </a>`).addTo(_map);
            condition = GenerateTip(_uvi);
            document.getElementsByClassName('mapboxgl-popup-content')[0].style.border = `3px solid ${condition.color}`;
            document.getElementsByClassName('mapboxgl-popup-content')[0].style.borderRadius = "15px";
        }
    })
}

function CallUvIndex(_lon, _lat) {
    if (_lon === undefined || _lat === undefined) {
        alert("Can not find locaiton");
    } else {
        const _KEY = "77777bb17bd1af04be3ba1bff39b3c07";
        const _WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&exclude=hourly,daily&appid=${_KEY}`;
        const promise = new Promise((resolve, reject) => {
            superagent.get(`${_WEATHER_API}`).end((err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var uvindex = res.body.current.uvi;
                    resolve(uvindex);
                }
            });
        });
        return promise;
    }
}

function GetUvIndex(_location) {
    GetLonAndLat(_location).then((res) => {
        if (res.lng === undefined || res.lat === undefined) {
            alert("Can not find location");
        } else {
            UpdateMap(res.lng, res.lat);
            return CallUvIndex(res.lng, res.lat);
        }
    }).then((resUvIndex) => {

        _UV_INDEX = resUvIndex;
        RenderTip(_UV_INDEX);
        AddPopUp(_LOCATION.lng, _LOCATION.lat, _UV_INDEX);
    })

}

function RenderTip(_uvi) {
    var advice_container = document.getElementsByClassName("advice-container")[0];
    var html = "";
    var condition = GenerateTip(_uvi);
    if (_uvi !== undefined) {
    	var equipment="";
  		condition.equipment.forEach(function(item,index){
  			equipment += `<img class="uv-map-my-img-custom" src="${item}""></img>`
  		})
        html = `<p class="moderate">Moderate: <i class="fas fa-user-shield" style="color:${condition.color}"></i> -  ${condition.condition} </p>
                <p class="advice">Advice: ${condition.advice} </p>
                <div class="equipment-icon">
                	${equipment}
                </div>`;
    } else {
        html = `<p style="font-size: 30px; text-align:center">Hi there, Wanna check your area's <span style="color:#fb8500">UV index</span>. <br> Let's discover it on our map</p>
        		<p style="font-size: 30px"> Click <a href="https://www.brunneis.ml/what-is-uv/" type="button">HERE </a>to understand what is <span style="color:#fb8500">UV index</span> </p>
        	`;
    }
    advice_container.innerHTML = html;
}


function main (){
RenderTip();
const _MAP = LoadMap();
geocoder = LoadGeocode();
   RenderGeocoder (_MAP,geocoder);
    
}


main();

document.getElementsByClassName("mapboxgl-ctrl-geocoder--button")[0].onclick = () => {
    popup.remove();
}