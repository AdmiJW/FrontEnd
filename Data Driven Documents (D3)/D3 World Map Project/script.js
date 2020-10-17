document.addEventListener('DOMContentLoaded', ()=> {

    let worldData = null;
    const svg = d3.select('svg');

    const mapToProjector = {
        geoAzimuthalEqualArea: d3.geoAzimuthalEqualArea(),
        geoAzimuthalEquidistant: d3.geoAzimuthalEquidistant(),
        geoGnomonic: d3.geoGnomonic(),
        geoOrthographic: d3.geoOrthographic(),
        geoStereographic: d3.geoStereographic(),
        geoEqualEarth: d3.geoEqualEarth(),
        geoConicEqualArea: d3.geoConicEqualArea(),
        geoConicEquidistant: d3.geoConicEquidistant(),
        geoEquirectangular: d3.geoEquirectangular(),
        geoMercator: d3.geoMercator(),
        geoNaturalEarth1: d3.geoNaturalEarth1()
    }
    

    // Loading The World Topological Data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    .then( data=> {
        worldData = topojson.feature( data, data.objects.countries );
        console.log(worldData);

        drawMap(worldData, 'geoAzimuthalEqualArea');
    });

    //  Event listener when map type changes
    document.getElementById('map_type').addEventListener('change',(e)=> {
        const mapType = e.currentTarget.value;
        drawMap( worldData, mapType );
    })


    //  The actual draw map function
    function drawMap( worldData, mapType ) {
        
        d3.select('#map').remove();

        const mapGroup = svg.append('g')
            .attr('id', 'map');

        const projection = mapToProjector[mapType].fitSize([1600,800], worldData);
        const pathGenerator = d3.geoPath().projection( projection );

        mapGroup.append('path')
            .attr('class', 'border')
            .attr('d', pathGenerator({ type: 'Sphere'} ) );

        const paths = mapGroup.selectAll('path')
            .data( worldData.features )
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('id', d=> d.properties.name )
            .attr('d', d=> pathGenerator(d) )
            .append('title')
                .text(d => d.properties.name );

        svg.call( d3.zoom().on('zoom', (event)=> {
            mapGroup.attr( 'transform', event.transform );
        }));
    }



});