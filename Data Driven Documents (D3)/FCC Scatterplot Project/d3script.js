
//  Upon document loaded, sends a AJAX request to the data source. Once fetched, call the drawGraph function
//  which takes in the response in JSON format
document.addEventListener('DOMContentLoaded', ()=> {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    xhr.onreadystatechange = ()=> {
        if (xhr.readyState === 4 && xhr.status === 200) {
            drawGraph( JSON.parse(xhr.response) );
        }
    };
    xhr.send();

});





//  Given seconds, return the time in MM:SS format
function getStrFromSeconds( sec ) {
    const min = Math.floor( sec / 60 );
    const secNew = sec % 60;

    return `${min}:${ secNew < 10? `0${secNew}`: secNew}`;
}

//  Given the year, return the year in Date object
function getYearToDate( year ) {
    const dateObj = new Date();
    dateObj.setTime(0);
    dateObj.setFullYear(year);

    return dateObj;
}

//  Given the time, in MM:SS format string, return the time in Date object
function getTimeToDate( time ) {
    const date = new Date();
    date.setTime(0);
    date.setMinutes( time.slice(0, 2) );
    date.setSeconds( time.slice(3) );
    return date;
}






function drawGraph( dataArr ) {

    //  Properties and variables
    const svg = d3.select('svg');
    
    const viewBox = { height: 600, width: 1000 };
    const margin = { top: 80, left: 70, right: 40, bottom: 40 };
    const innerHeight = viewBox.height - margin.top - margin.bottom;
    const innerWidth = viewBox.width - margin.left - margin.right;

    const plotRadius = 7;

    const legendSize = { height: 200, width: 250 };
    const legendX = viewBox.width - margin.right - legendSize.width;
    const legendY = viewBox.height / 2 - legendSize.height / 2;

    const years = dataArr.map( obj => Number(obj.Year) );
    const times = dataArr.map( obj => Number(obj.Seconds) );



    //======================================
    //  Title
    //========================================
    svg.append('text')
        .attr('id', 'title')
        .text('Doping in Professional Bicycle Racing')
        .attr('text-anchor', 'middle')
        .style('transform', `translate( ${viewBox.width / 2}px, 35px ) `);

    svg.append('text')
        .attr('id', 'sub-title')
        .text(`35 Fastest times up Alpe d'Huez`)
        .attr('text-anchor', 'middle')
        .style('transform', `translate( ${viewBox.width / 2}px, 60px)`);



    //======================================
    //  LEGEND
    //========================================
    const legendWindow = svg.append('g')
        .attr('id', 'legend');


    legendWindow.append('rect')
        .attr('id', 'legend__window')
        .attr('x', legendX)
        .attr('y', legendY)
        .attr('width', legendSize.width)
        .attr('height', legendSize.height)
        .attr('rx', 20)
        .attr('ry', 20);

    legendWindow.append('text')
        .attr('id', 'legend__title')
        .attr('text-anchor', 'middle')
        .attr('x', legendX + legendSize.width / 2)
        .attr('y', legendY + 40)
        .text('LEGEND');

    legendWindow.append('circle')
        .attr('id', 'legend__dot--green')
        .attr('r', 15)
        .attr('cx', legendX + 30)
        .attr('cy', legendY + 70)
        .attr('stroke-width', 4);

    legendWindow.append('circle')
        .attr('id', 'legend__dot--red')
        .attr('r', 15)
        .attr('cx', legendX + 30)
        .attr('cy', legendY + 150)
        .attr('stroke-width', 4);

    legendWindow.append('text')
        .attr('id', 'legend__dot--red-text')
        .attr('text-anchor', 'left')
        .text('No Doping Allegations')
        .attr('x', legendX + 60)
        .attr('y', legendY + 75);

    legendWindow.append('text')
        .attr('id', 'legend__dot--green-text')
        .attr('text-anchor', 'left')
        .text('Riders with Doping')
        .attr('x', legendX + 60)
        .attr('y', legendY + 145);
    legendWindow.append('text')
        .attr('id', 'legend__dot--green-text2')
        .attr('text-anchor', 'left')
        .text('Allegations')
        .attr('x', legendX + 60)
        .attr('y', legendY + 165);

    
    
    //======================================
    //  X Scale 
    //========================================
    const extentYear = d3.extent(years);

    const xScale = d3.scaleTime()
        .domain( [ getYearToDate(extentYear[0]), getYearToDate(extentYear[1]) ] )
        .range( [ margin.left, margin.left + innerWidth ] )
        .nice();

    //======================================
    //  X Axis
    //======================================
    const xAxis = d3.axisBottom( xScale )
        .tickPadding(15);

    const xAxisGroup = svg.append('g')
        .attr('id', 'x-axis');

    xAxisGroup.call(xAxis)
        .style('transform', `translateY( ${margin.top + innerHeight}px )`);

    xAxisGroup.append('text')
        .attr('id', 'x-axis__label')
        .text('Year')
        .attr('text-anchor', 'end')
        .attr('x', `${viewBox.width - margin.right}px`)
        .attr('y', `-5px`)


    //======================================
    //  Y Scale
    //======================================
    const extentTime = d3.extent(times);

    const yScale = d3.scaleLinear()
        .domain(  [extentTime[1], extentTime[0] ] )
        .range( [ margin.top, margin.top + innerHeight] )
        .nice();


    //======================================
    //  Y Axis
    //======================================
    const yAxis = d3.axisLeft( yScale )
        .tickFormat( (seconds) => getStrFromSeconds(seconds) )
        .tickSizeInner( -innerWidth )
        .tickPadding(10);

    const yAxisGroup = svg.append('g')
        .attr('id', 'y-axis');

    yAxisGroup.call( yAxis )
        .style('transform', `translateX(${margin.left}px )`);

    yAxisGroup.append('text')
        .attr('id', 'y-axis__label')
        .text("Time in Minutes")
        .style('transform', 'rotate(-90deg')
        .attr('x', -margin.top - 10)
        .attr('y', 30)



    //======================================
    //  Source (Citation)
    //======================================
    svg.append('a')
        .attr('href', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .attr('target', '_blank')
        .append('text')
        .text('Click here for more information')
        .attr('id', 'citation')
        .attr('text-anchor', 'middle')
        .attr('x', legendX + legendSize.width / 2)
        .attr('y', legendY + legendSize.height + 15);



    //======================================
    //  Plots (Dots)
    //======================================
    const plots = svg.append('g')
        .attr('id', 'plots');

    plots.selectAll('circle')
        .data( dataArr )
        .enter()
        .append('circle')
        .attr('r', plotRadius )
        .attr('cx', data => xScale( getYearToDate(data.Year) ) )
        .attr('cy', data => yScale( data.Seconds) )
        .attr('class', data => data.Doping? 'dot doping': 'dot no-doping')
        //  Inserting data into each plot
        .attr('data-xvalue', data => getYearToDate( data.Year) )
        .attr('data-yvalue', data => getTimeToDate( data.Time) )
        .attr('data-second', data => data.Seconds )
        .attr('data-year', data => data.Year )
        .attr('data-place', data => data.Place)
        .attr('data-name', data => data.Name )
        .attr('data-nationality', data => data.Nationality )
        .attr('data-doping', data => data.Doping )
        .attr('data-url', data => data.URL );


    //=========================================
    //  On Hover event listener for the plot dots
    const tooltip = document.getElementById('tooltip');
    
    let isDotFocus = false;    //  A flag boolean indicating whether to make the tooltip window visible or not
    let isToolHover = false;    //  A flag boolean indicating whether tooltip window is being hovered or not
    let zIndexTimeout = null;

    //  When mouse is in the tooltip area, don't make it dissapear (Only after the dot is focused by clicking on it)
    tooltip.addEventListener('mouseenter', ()=> {
        isToolHover = true;
    });
    tooltip.addEventListener('mouseleave', ()=> {
        isToolHover = false;
        hideTooltip();
    });


    document.querySelectorAll('.dot')
    .forEach(elem => {
        elem.addEventListener('mouseenter', showTooltip );
        elem.addEventListener('mouseleave', hideTooltip );
        elem.addEventListener('focus', (e) => {
            isDotFocus = true;
            showTooltip(e);
        });
        elem.addEventListener('blur', (e)=> {
            isDotFocus = false;
            hideTooltip();
        });
    });


    //  Pass in the event which currentTarget is the plot SVG element, will set the tooltip window's information
    //  and also position it correctly
    function showTooltip(event) {
        window.clearTimeout(zIndexTimeout);
        tooltip.style.zIndex = 1;

        tooltip.style.opacity = 1;
        const elem = event.currentTarget;

        //  Setting of the tooltip window's data based on the dataset of the selected dot's SVG
        const [timeE, placeE, nameE, yearE, nationalityE, dopingE, urlE] = tooltip.children[0].children;
        const { doping, name, place, nationality, second, url, year, xvalue } = elem.dataset;

        tooltip.dataset["year"] = xvalue;
        timeE.children[1].innerText = getStrFromSeconds(second);
        placeE.children[1].innerText = place;
        nameE.children[1].innerText = name;
        yearE.children[1].innerText = year;
        nationalityE.children[1].innerText = nationality;
        dopingE.children[1].innerText = doping;

        const anchorTag = urlE.children[1].children[0];
        //  If URL is not empty string, it is a doping case
        if (url) {
            anchorTag.innerText = 'Link';
            anchorTag.href = url;

            tooltip.style.backgroundColor = '#e74c3c';      //Orangish color of the plot
        }
        //  Otherwise there is no URL, it is not a doping case 
        else {
            anchorTag.innerText = '';   
            tooltip.style.backgroundColor = '#2ecc71';      //Green color of the plot
        }


        //  Positioning of the tooltip window

        const windowHalfY = window.innerHeight / 2;
        const windowHalfX = window.innerWidth / 2;


        const boundingRect = event.currentTarget.getBoundingClientRect();
        const rectXCenter = boundingRect.x + boundingRect.width / 2;
        const rectYCenter = boundingRect.y + boundingRect.height / 2;

        tooltip.style.top = `${rectYCenter + ( (rectYCenter > windowHalfY)? -tooltip.clientHeight: 10 ) }px`;
        tooltip.style.left = `clamp(0px, 
            ${rectXCenter + ( (rectXCenter > windowHalfX)? -tooltip.clientWidth: 10 ) }px, 
            ${window.innerWidth - tooltip.clientWidth}px)`;

    }

    //  Will hide the tooltip. To ensure the fade away animation, a setTimeout is used so the z index setting
    //  applies after the opacity is faded
    function hideTooltip() {
        if (isDotFocus || isToolHover) return;

        tooltip.style.opacity = 0;
        zIndexTimeout = window.setTimeout(()=> {
            tooltip.style.zIndex = -1;
        }, 200);
    }

}