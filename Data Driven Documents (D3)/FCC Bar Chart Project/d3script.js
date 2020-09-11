document.addEventListener('DOMContentLoaded', ()=> {

//  Fetches the data. Upon fetch, call the callback function to draw the graph
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

xhr.onreadystatechange = (e) => {
    if (xhr.status === 200 && xhr.readyState === 4) {
        const json = JSON.parse( xhr.responseText );
        setupGraph( json );
    }
};

xhr.send();



//  Set up the event listener to click when the open menu button is clicked, to open or close the
//  HIGHTLIGHT WINDOW 
document.getElementById('openclose-menu-btn').addEventListener('click', (e)=> {
    document.getElementById('notes').classList.toggle('opened');
    e.currentTarget.children[0].classList.toggle('fa-times');
});

});



//  SET UP THE GRAPH. CALLBACK FUNCTION INVOKED WHEN XMLHTTPREQUEST RESPONDED
function setupGraph( dataJSON ) {

    const dataset = dataJSON.data; 

    const width = 600;
    const height = 400;
    const margin = { top: 30, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svgElem = d3.select('svg');


    // ======================= SCALES ===============================
    const minTime = d3.min( dataset.map(d => d[0]) );
    const maxTime = d3.max( dataset.map(d => d[0]) );
 

    const xScale = d3.scaleTime()
        .domain( [Date.parse(minTime), Date.parse(maxTime) ] )
        .range([ 0, innerWidth ] );     //  The maximum width it shall go is innerWidth

    const yScale = d3.scaleLinear()
        .domain( [0, d3.max(dataset.map(d => d[1]) ) ] )
        .range([ innerHeight, 0 ] );        //  The maximum height it shall go is innerHeight

    const bandScale = d3.scaleBand()
        .domain( dataset.map(d => d[1] ) )
        .range( [ 0, innerWidth ] )
        .padding(0.1);


    // ======================= X-AXIS ===============================
    const xAxisGenerator = d3.axisBottom(xScale)
        .tickSizeOuter( 0 );

    const xAxis = svgElem.append('g')
        .attr('id', 'x-axis')
        .call( xAxisGenerator );
    xAxis.style('transform', ` translate(${margin.left}px, ${height - margin.bottom}px ) `);


    // ======================= Y-AXIS ===============================
    const yAxisGenerator = d3.axisLeft(yScale)
        .tickSizeInner( -innerWidth )
        .tickSizeOuter( -3 );

    const yAxis = svgElem.append('g')
        .attr('id', 'y-axis')
        .call( yAxisGenerator );
    yAxis.style('transform', ` translate(${margin.left}px, ${margin.top}px )`);
        
    

    // ======================= BARS ===============================
    svgElem.append('g')
        .attr('class', 'bars')
        .selectAll('rect')
        .data( dataset )
        .enter()
        //  Appending the bars
        .append('rect')
        .attr('class', 'bar')
        .attr('id', (data, idx) => `bar-${idx}`)
        .attr('data-date', (data) => data[0] )
        .attr('data-gdp', (data) => data[1] )
        .attr('x', (data) => xScale( Date.parse(data[0]) ) + margin.left )
        .attr('y', (data) => margin.top + yScale( data[1] ) )
        .attr('height', (data) => innerHeight - yScale(data[1] ) )
        .attr('width', bandScale.bandwidth() )


    // ======================= TOOLTIP ===============================
    const tooltipDiv = document.getElementById('tooltip');
    const getTooltipDate = (dateStr) => {
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(5,7);

        return `${year} ${month === '01'? 'Q1': month === '04'? 'Q2': month === '07'? 'Q3': 'Q4'}`;
    };
    function showTooltip(event) {
        //  If the bar is at right edge, show the tooltip on the bar's left side instead of right side
        const offsetX = event.clientX >= window.innerWidth * 0.85? -165: 15;

        const barData = event.currentTarget.dataset;

        tooltipDiv.dataset.date = barData['date'];
        tooltipDiv.style.top = `${event.clientY + 10}px`
        tooltipDiv.style.left = `${event.clientX + offsetX}px`;
        tooltipDiv.style.opacity = 1;
        tooltipDiv.children[0].innerText = getTooltipDate( barData['date'] );
        tooltipDiv.children[1].innerText = `$${barData['gdp']} Billion`;
    }
    function hideTooltip() {
        tooltipDiv.style.opacity = 0;
    }
    function resetTooltipPosition() {
        tooltipDiv.style.top = 0;
        tooltipDiv.style.left = 0;
    }

    //  When window is resized, reset the tooltip's position to 0, 0 so it don't cause overflow
    window.addEventListener('resize', ()=> {
        resetTooltipPosition();
    })


    // ======================= NOTES ===============================
    const noteDiv = document.getElementById('notes');
    const addedIndicator = document.getElementById('added-indicator');

    //  Creates a note div with all the informations set based on the bar element passed in
    //  This self invoking function to hide away the next ID
    let createNote = ( function() {
        let nextID = 0;
        //  Takes in the bar, along with the mouse / touch position to show the indicator that highlight is added
        return function ( bar, clientX, clientY ) {

            //  Creation of the HTML element
            const note = document.createElement('div');
            note.className = 'notes__note';
            note.id = `note-${nextID++}`;

            const button = document.createElement('button');
            button.className = 'btn del-note-btn';

            const fontawesome = document.createElement('i');
            fontawesome.className = 'fas fa-times';

            const note_date = document.createElement('p');
            note_date.className = 'notes__note__date';
            note_date.innerHTML = `Date: <span class='notes__note__date--content'>${ bar.dataset['date']}</span>`;

            const note_gdp = document.createElement('p');
            note_gdp.className = 'notes__note__gdp';
            note_gdp.innerHTML = `GDP Value: <span class='notes__note__gdp--content'>$${ bar.dataset['gdp']} Billion</span>`;

            note.appendChild(button);
            button.appendChild(fontawesome);
            note.appendChild(note_date);
            note.appendChild(note_gdp);


            //  Function which highlights the bar element in the graph when note is focused
            const highlightBar = (bar) => {
                bar.style.stroke = 'black';
                bar.style.strokeWidth = 1;
            }
            //  Function to remove highlight the bar element in the grpah when note is blurred
            const unhighlightBar = (bar) => {
                bar.style.strokeWidth = 0;
            }

            //  The bar element represented by this note
            note.respectiveBar = bar;

            //  When note is hovered, highlight the bar element
            note.addEventListener('mouseenter', ()=> {
                highlightBar( note.respectiveBar );
            });
            note.addEventListener('mouseleave', ()=> {
                unhighlightBar( note.respectiveBar );
            })

            //  Close button is clicked. Delete the note
            button.addEventListener('click', ()=> {
                note.classList.add('closing');
                setTimeout(() => {
                    note.respectiveBar.style.strokeWidth = 0;
                    note.remove();
                }, 500);
            })

            //  Append the note element into the HIGHLIGHT WINODW
            noteDiv.appendChild(note);

            //  Since a note is added, show the indicator to acknowledge the user that a note has been added
            addedIndicator.style.left = clientX - 50 + 'px';
            addedIndicator.style.top = clientY - 50 + 'px';
            addedIndicator.style.animationName = 'floatup';
            setTimeout(() => {
                addedIndicator.style.left = 0;
                addedIndicator.style.top = 0;
                addedIndicator.style.animationName = '';
            }, 2000);
        }
    })();


    //  For mobile devices. Detect a touch hold event to add note
    const holdDuration = 1000;
    let timeoutObject = null;

    function onTouchStart (bar, clientX, clientY) {
        //  Currently user is not holding on the screen
        if (!timeoutObject) {
            timeoutObject = setTimeout(() => {
                createNote(bar, clientX, clientY);
                window.clearTimeout( timeoutObject );
                intervalObject = null;
            }, holdDuration);
        }
    }
    //  If user removes the touch before the set holdDuration, then clear the timeout
    function onTouchEnd (bar) {
        window.clearTimeout( timeoutObject );
        timeoutObject = null;
    }

    //  ADDING EVENT LISTENER TO THE BARS, SUCH THAT ON HOVER, IT SHOWS THE TOOLTIP
    //  WHEN CLICKED, IT ADDS A NEW NOTE INTO THE SELECTED DIV
    document.querySelectorAll('.bar').forEach(bar => {
        bar.addEventListener('mouseenter', (e)=> {
            showTooltip(e);
        });
        bar.addEventListener('mouseleave', ()=> {
            hideTooltip();
        });
        bar.addEventListener('dblclick', (e)=> {
            createNote(bar, e.clientX, e.clientY);
        });
        bar.addEventListener('touchstart', (e)=> onTouchStart(bar, e.touches[0].clientX, e.touches[0].clientY)  );
        bar.addEventListener('touchend', onTouchEnd );
    })



    // ======================= TITLES ===============================
    const titlewidth = 500;
    const titleheight = 30;

    svgElem.append('text')
        .attr('id', 'title')
        .text('United States GDP From 1947 to 2015')
        .attr('x', width / 2)
        .attr('y', margin.top)
        .attr('text-anchor', 'middle');

    svgElem.append('text')
        .attr('id', 'y-axis-label')
        .text('Gross Domestic Product (Billion)')
        .attr('text-anchor', 'left')
        .attr('x', -margin.top - 150)
        .attr('y', margin.left + 15)
        .style('transform', 'rotate(-90deg)' );

    //  Citation and referral
    svgElem.append('a')
        .attr('id', 'cite')
        .attr('href', 'http://www.bea.gov/national/pdf/nipaguid.pdf')
        .attr('target', '_blank')
        .append('text')
        .text('For more information, click here')
        .attr('x', 455)
        .attr('y', innerHeight + margin.top + 28)



    //  A little guide on how to add selection to HIGHLIGHT WINDOW
    window.alert( String.raw `To add selection bars into the Highlighted window:
        > For desktop users, simply double click on one of the bars
        > For mobile users, touch and hold the bar longer than 1 second` );

}