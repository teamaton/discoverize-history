const COLORS = {
    white: 'rgba(255, 255, 255, 1)',
    white_light: 'rgba(255, 255, 255, 0.5)',
    white_lighter: 'rgba(255, 255, 255, 0.1)',
}

const STYLES = {
    labels: {
        fontFamily: 'Open Sans',
        color: 'rgba(255, 255, 255, .8)'
    },
    specialPoint: {
        borderWidth: 13,
        pointRadius: 2
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips:{
            intersect: false,
            displayColors: false,
            titleFontColor: '#777',
            backgroundColor: COLORS.white,
            cornerRadius: 3,
            bodyFontColor: '#777'
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                ticks: {
                    padding: 10, 
                    source: 'data'
                },
                // grid line settings
                gridLines: {
                    show: true,
                    color: COLORS.white_lighter,
                    lineWidth: 2,
                    drawOnChartArea: true,
                    drawTicks: false, // draw ticks extending towards the label
                    zeroLineWidth: 0,
                },
                type: 'time',
                distribution: 'series',
                time: {
                    parser: 'YYYY',
                    unit: 'year',
                    tooltipFormat: 'YYYY',
                    displayFormats: {
                        year: 'yyyy'
                    },
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 10, 
                },
                position: "right",
                // grid line settings
                gridLines: {
                    show: true,
                    color: COLORS.white_lighter,
                    lineWidth: 2,
                    drawOnChartArea: true,
                    drawTicks: false, // draw ticks extending towards the label
                    zeroLineWidth: 0,
                },
            }],
            
        },
    },
    datasets: [{
        // Data for the graph
        data: null,
        backgroundColor: [
            COLORS.white_light
        ],
        borderColor: '#FFFFFF',
        
        //Number - Pixel width of dataset border
        borderWidth: 2,
        //Number - Tension of the bezier curve between points
        tension: .2,
        //Number - Radius of each point dot in pixels
        pointRadius: 3,
        //Number - Pixel width of point dot border
        pointBorderWidth: 5,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHoverRadius: 10,
    }]
}

export { STYLES }