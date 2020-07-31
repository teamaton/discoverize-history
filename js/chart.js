const CONTAINER = document.querySelector('.container').style;
const TOGGLE_BTNS = document.querySelectorAll('.btn--toggle');
const MILESTONES = document.querySelectorAll('.milestone');
const FAKE_DATA = {
    'portals': [5, 5, 14, 18, 25, 40, 70, 120, 130, 130, 130, 200, 210, 300],
    'team_members': [1, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 7, 7, 6],
    'sessions': [120, 240, 560, 780, 1400, 2708, 5000, 5300, 5300, 5300, 12000, 12200, 17200, 12000],
    'inquiries': [45, 634, 22, 3425, 634, 6473, 352, 9645, 754, 3547, 5464, 6532, 9543, 8000],
}
// Adapt dots on graph to the size of a window
const ADAPT_DOTS = () => {
    if(self.innerWidth < 600){
        //Number - Radius of each point dot in pixels
        myChart.data.datasets[0].pointRadius = 3;
        //Number - Pixel width of point dot border
        myChart.data.datasets[0].pointBorderWidth = 4;
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        myChart.data.datasets[0].pointHoverRadius = 5;
    } else{
        myChart.data.datasets[0].pointRadius = 3;
        myChart.data.datasets[0].pointBorderWidth = 5;
        myChart.data.datasets[0].pointHoverRadius = 10;
    }
}

TOGGLE_BTNS.forEach(btn => {
    btn.addEventListener('click', () => {
        
        const UPDATE_STYLES = () => {
            let new_color = btn.getAttribute('theme_color');

            CONTAINER.background = new_color
            MILESTONES.forEach(card => {
                card.style.backgroundColor = new_color;
                card.style.boxShadow = `4px 4px 20px ${new_color}40`;
            })

            if(self.innerWidth < 600){
                TOGGLE_BTNS.forEach(btn => btn.classList.remove('lastBtn'));
                btn.classList.add('lastBtn');
            }  
            
            TOGGLE_BTNS.forEach(btn => btn.classList.remove('btn--toggle--active'));
            btn.classList.add('btn--toggle--active');
        }

        UPDATE_STYLES();

        // Display new data on graph
        switch(btn.textContent.toLowerCase()){
            case 'portals': 
                myChart.data.datasets[0].data = FAKE_DATA.portals;
                break;
            case 'team members': 
                myChart.data.datasets[0].data = FAKE_DATA.team_members;
                break;
            case 'sessions': 
                myChart.data.datasets[0].data = FAKE_DATA.sessions;
                break;
            case 'inquiries': 
                myChart.data.datasets[0].data = FAKE_DATA.inquiries;
                break;
        }
        myChart.update();
    });
});

var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, .8)';
Chart.defaults.global.defaultFontFamily = 'Open Sans';
var myChart = new Chart(ctx, {
    type: 'line',
    responsive: true,
    data: {
        labels: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        datasets: [{
            label: 'Count: ',
            data: FAKE_DATA.portals,
            backgroundColor: [
                'rgba(255, 255, 255, 0.5)'
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
    },
    options: {
        tooltips:{
            intersect: false,
            displayColors: false,
            titleFontColor: '#777',
            backgroundColor: 'rgba(256, 256, 256, 1)',
            cornerRadius: 3,
            bodyFontColor: '#777'
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 10, 
                },
                // grid line settings
                gridLines: {
                    show: true,
                    color: "rgba(256, 256, 256, 0.1)",
                    lineWidth: 2,
                    drawOnChartArea: true,
                    drawTicks: false, // draw ticks extending towards the label
                    zeroLineWidth: 0,
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
                    color: "rgba(256, 256, 256, 0.1)",
                    lineWidth: 2,
                    drawOnChartArea: true,
                    drawTicks: false, // draw ticks extending towards the label
                    zeroLineWidth: 0,
                },
            }],
            
        },
    }
});

window.onresize = () => {
    ADAPT_DOTS();
};

window.onload = () => {
    ADAPT_DOTS();
};
