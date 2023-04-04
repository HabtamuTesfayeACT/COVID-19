
var COVIDdata;
var CounrtyArray = new Array();
var tOTALaRRAY = new Array();
var toalDeathhArray = new Array();
var newConfi = new Array();
async function fetchinfo() {
   await fetch('https://api.covid19api.com/summary')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("globalcase",JSON.stringify(data));
        let decntrilaized = JSON.parse(localStorage.getItem("globalcase"));
        COVIDdata = decntrilaized;
        appendDataToTable(decntrilaized);
        fun(COVIDdata);
        storeCountryDate(COVIDdata);
        draw1(COVIDdata);
        passdata(decntrilaized);
       })
      .catch(error => {
        console.error(error);
      });
  }
fetchinfo();
/*=================================================== filter ============================================*/
loadCountries();
let countries = [];
function loadCountries() {
    fetch('https://api.covid19api.com/countries')
        .then(response => response.json())
        .then(data => {
            countries = data.map(item => item.Country);
            renderCountryOptions(countries);
        })
        .catch(error => {
            console.error('Error retrieving data:', error);
        });
}

function renderCountryOptions(countries) {
    let optionsHtml = '';
    countries.forEach(country => {
        optionsHtml += `<option value="${country}">${country}</option>`;
    });
    document.querySelector('#country-list').innerHTML = optionsHtml;
}
/*=====================================================================================================================================*/
async function fetchlive(){
await fetch('https://api.covid19api.com/dayone/country/Ethiopia/status/confirmed/live')
.then(response =>{
    if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
})
.then(data => {
    localStorage.setItem("live",JSON.stringify(data));
    let Fixlive = JSON.parse(localStorage.getItem("live"));
    acceptdata(Fixlive);
 })
}
fetchlive();
async function acceptdata(s){
  s.forEach(cases =>{
    document.getElementById('case').innerHTML=cases.Cases.toLocaleString("en-US");
    document.getElementById('Stat').innerHTML=cases.Status;
  })
}

async function storeCountryDate(data){
 for(let i=0; i<5; i++){
    let rand = Math.floor(Math.random()*160);
    CounrtyArray[i]=data.Countries[rand].Country;
    tOTALaRRAY[i]=data.Countries[rand].TotalConfirmed;
    toalDeathhArray[i]=data.Countries[rand].TotalDeaths;
    newConfi[i]=data.Countries[rand].NewConfirmed;
 }
 draw4(CounrtyArray,tOTALaRRAY,toalDeathhArray,newConfi);
}

  var i=1;
async function appendDataToTable(data) {
    document.getElementById('totalCase').innerHTML=data.Global.TotalConfirmed.toLocaleString("en-US");
    document.getElementById('Deaths').innerHTML=data.Global.TotalDeaths.toLocaleString("en-US");
    document.getElementById('Recov').innerHTML= data.Global.TotalRecovered.toLocaleString("en-US");
    document.getElementById('date').innerHTML=data.Global.Date;
   const tableBody = document.querySelector('tbody');

    await data.Countries.forEach(names => {
     const tr = document.createElement('tr');

    const number = document.createElement('td');
    number.textContent = i; i++;
    const country = document.createElement('td');
    country.textContent = names.Country;
    const NewConfirmed = document.createElement('td');
    NewConfirmed.textContent = names.NewConfirmed;
    const TotalConfirmed = document.createElement('td');
    TotalConfirmed.textContent = names.TotalConfirmed;
    const NewDeaths = document.createElement('td');
    NewDeaths.textContent = names.NewDeaths;
    const TotalDeaths = document.createElement('td');
    TotalDeaths.textContent = names.TotalDeaths;
    const NewRecovered = document.createElement('td');
    NewRecovered.textContent = names.NewRecovered;
    const TotalRecovered = document.createElement('td');
    TotalRecovered.textContent = names.TotalRecovered;
    tr.appendChild(number);
    tr.appendChild(country);
    tr.appendChild(NewConfirmed);
    tr.appendChild(TotalConfirmed);
    tr.appendChild(NewDeaths);
    tr.appendChild(TotalDeaths);
    tr.appendChild(NewRecovered);
    tr.appendChild(TotalRecovered);
    tableBody.appendChild(tr);
  });
      // Convert table to DataTable
$(document).ready(function() {
    $('#myTable').DataTable();
  });
}

async function fun(info){
    /*============================================ pie ===================================================*/
Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Percetage Data to the world',
        align: 'left'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Share',
        data: [
            ['NewConfirmed', parseFloat(info.Global.NewConfirmed / 8000000000)],
            ['TotalConfirmed', parseFloat(info.Global.TotalConfirmed  / 8000000000)+0.2],
            {
                name: 'helthy',
                y: 12,
                sliced: true,
                selected: true
            },
            ['NewDeaths',parseFloat(info.Global.NewDeaths  / 8000000000)+0.1],
            ['TotalDeath',parseFloat(info.Global.TotalDeaths  / 8000000000)],
            ['NewRecovered', parseFloat(info.Global.NewRecovered  / 8000000000)],
            ['TotalRecovered', parseFloat(info.Global.TotalRecovered  / 8000000000)]
        ]
    }]
  });
}

/*=============================================== map -=============================================*/
async function draw1(info){
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json', function (data) {
        
        // Prevent logarithmic errors in color calulcation
        data.forEach(function (p) {
            let key =0;
            info.Countries.forEach(names =>{
               if(p.code === names.CountryCode){
                p.value = (names.TotalConfirmed < 1 ? 1 : names.TotalConfirmed);
                key = 1;
               }
            })
            if(key = 0){
                p.value = ('No value is found'< 1 ? 1 : 'No value is found');
            }
        });

        // Initialize the chart
        Highcharts.mapChart('map', {
            chart: {
                map: topology
            },

            title: {
                text: 'Total world case confirmed population per country'
            },

            mapNavigation: {
                enabled: true,
                enableDoubleClickZoomTo: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            mapView: {
                fitToGeometry: {
                    type: 'MultiPoint',
                    coordinates: [
                        // Alaska west
                        [-164, 54],
                        // Greenland north
                        [-35, 84],
                        // New Zealand east
                        [179, -38],
                        // Chile south
                        [-68, -55]
                    ]
                }
            },

            colorAxis: {
                min: 1,
                max: 1000,
                type: 'logarithmic'
            },

            series: [{
                data: data,
                joinBy: ['iso-a3', 'code3'],
                name: 'Population Confirmed case',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                tooltip: {
                    valueSuffix: ' people'
                }
            }]
        });
    });

}

/*=========================================== 4 ===============================================*/
async function draw4(CounrtyArray,tOTALaRRAY,toalDeathhArray,newConfi){
// Data retrieved from https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk
Highcharts.chart('chart4', {
    title: {
        text: 'Random countries TotalConfirmed case comparision',
        align: 'left'
    },
    xAxis: {
        categories: [CounrtyArray[0], CounrtyArray[1], CounrtyArray[2],CounrtyArray[3],CounrtyArray[4]]
    },
    yAxis: {
        title: {
            text: 'Number of People'
        }
    },
    tooltip: {
        valueSuffix: 'people'
    },
    series: [{
        type: 'column',
        name: 'Total Conifermed',
        data: [parseFloat(tOTALaRRAY[0]),parseFloat(tOTALaRRAY[1]),parseFloat(tOTALaRRAY[2]),parseFloat(tOTALaRRAY[3]),parseFloat(tOTALaRRAY[4])]
    }, {
        type: 'column',
        name: 'Total Death',
        data: [parseFloat(toalDeathhArray[0]),parseFloat(toalDeathhArray[1]),parseFloat(toalDeathhArray[2]),parseFloat(toalDeathhArray[03]),parseFloat(toalDeathhArray[4])]
    }, {
        type: 'column',
        name: 'New Conifermed',
        data: [parseFloat(newConfi[0]),parseFloat(newConfi[1]),parseFloat(newConfi[2]),parseFloat(newConfi[3]),parseFloat(newConfi[4])]
    }, {
        type: 'pie',
        name: 'Total',
        data: [{
            name: 'Total Conifermed',
            y: parseFloat(tOTALaRRAY[0])+parseFloat(tOTALaRRAY[1])+parseFloat(tOTALaRRAY[2])+parseFloat(tOTALaRRAY[3])+parseFloat(tOTALaRRAY[4]),
            color: Highcharts.getOptions().colors[0], // 2020 color
            dataLabels: {
                enabled: true,
                distance: -20,
                format: '{point.total} M',
                style: {
                    fontSize: '15px'
                }
            }
        }, {
            name: 'Total Death',
            y: parseFloat(newConfi[0])+parseFloat(newConfi[1])+parseFloat(newConfi[2])+parseFloat(newConfi[3])+parseFloat(newConfi[4]),
            color: Highcharts.getOptions().colors[1] // 2021 color
        }, {
            name: 'New Conifermed',
            y: parseFloat(newConfi[0])+parseFloat(newConfi[1])+parseFloat(newConfi[2])+parseFloat(newConfi[3])+parseFloat(newConfi[4]),
            color: Highcharts.getOptions().colors[2] // 2022 color
        }],
        center: [35, 15],
        size: 70,
        innerSize: '70%',
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
});
}
async function fetchdata() {
    await fetch('https://api.covid19api.com/live/country/south-africa')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("country", JSON.stringify(data));
            let clarified = JSON.parse(localStorage.getItem("country"));
            let name ='South Africa';
            passdata(clarified,name);
        })
        .catch(error => {
            console.error(error);
        });
}
fetchdata();


async function compare(id,confi,death,reco,active){
    /*============================================== 3 ============================================*/
Highcharts.chart('country-comparison-chart', {
    title: {
        text: id
    },
    xAxis: {
        categories: ['Confirmed', 'Deaths', 'Recovered', 'Active']
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    series: [{
        name: 'Number of peoples in ' + id,
        data: [parseFloat(confi),parseFloat(death),parseFloat(reco),parseFloat(active)]
    }]
});
}
compare();

async function drawSearch(){
    let conti =0;
    let area = document.getElementById('country-comparison-chart').innerHTML;
    area ="";
    const country = document.querySelector('#country').value;
    console.log(country);
    const search = 'https://api.covid19api.com/live/country/'
    await fetch(`${search}${country}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("DataCountry", JSON.stringify(data));
        let CountrtData = JSON.parse(localStorage.getItem("DataCountry"));
        passdata(CountrtData,country);
    })
    .catch(error => {
        console.error(error);
    });
}
async function passdata(info,name){
    let area = document.getElementById('country-comparison-chart');
    if(info.length == 0){
        area.innerHTML= "";
    let err = document.createElement('p')
    err.textContent ='No Countries found and please check your spelling '
    area.appendChild(err);
    }
    else{
    for(let i=0;  i<5; i++){
       compare(name,info[i].Confirmed,info[i].Deaths,info[i].Recovered,info[i].Active)
    }
}
}
/*================== for navbar toggle =======================*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
  })();