import { STYLES } from './styles.js';

const CONTAINER = document.querySelector('.container').style;
const TOGGLE_BTNS = document.querySelectorAll('.btn--toggle');
const MILESTONES_CONTAINER = document.querySelector('.milestonesGroup');
const CHART_SCORE = document.querySelector('.chart__score');
const CHART_CATEGORY = document.querySelector('.chart__category');
let data_from_json;

// Get data for milestones
fetch('../data/milestones.json')
    .then(response => response.json())
    .then(data => data.milestones)
    .then(data => {
        data.forEach(milestone => {
            MILESTONES_CONTAINER.innerHTML += `
                <div class="milestone">
                    <h3 class='milestone__title'>${milestone.title}</h3>
                    <p class='milestone__date'>${milestone.date}</p>
                </div>
            `;
        });
    });

// Nav functionality and change of styles
TOGGLE_BTNS.forEach(btn => {
    btn.addEventListener('click', () => {
        
        const UPDATE_STYLES = () => {
            let new_color = btn.getAttribute('theme_color');

            CONTAINER.background = new_color;
            const MILESTONES = document.querySelectorAll('.milestone');
            MILESTONES.forEach(card => {
                card.style.backgroundColor = new_color;
                card.style.boxShadow = `4px 4px 20px ${new_color}40`;
            });
            
            TOGGLE_BTNS.forEach(btn => btn.classList.remove('btn--toggle--active'));
            btn.classList.add('btn--toggle--active');
        }

        UPDATE_STYLES();

        // Display new data on graph
        switch(btn.textContent.toLowerCase()){
            case 'portals': 
                myChart.data.datasets[0].data = data_from_json.portals;
                break;
            case 'team': 
                myChart.data.datasets[0].data = data_from_json.team;
                break;
            case 'sessions': 
                myChart.data.datasets[0].data = data_from_json.sessions;
                break;
            case 'inquiries': 
                myChart.data.datasets[0].data = data_from_json.inquiries;
                break;
        }
        myChart.update();
    });
});

// Graph settings
var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, .8)';
Chart.defaults.global.defaultFontFamily = 'Open Sans';
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: STYLES.datasets
    },
    options: STYLES.options
});

// RWD for points on the graph
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

// Get data for the graph
fetch('../data/graph_data.json')
    .then(response => response.json())
    .then(data => data.categories)
    .then(data => {
        data_from_json = data;
        for (let category in data_from_json) {
            data_from_json[category].forEach(data => {
                data.x = new Date(data.x, 1, 1);
            })
        }

        myChart.data.datasets[0].data = data_from_json.portals;
        myChart.update();
    });

window.addEventListener('resize', ADAPT_DOTS);
window.addEventListener('load', ADAPT_DOTS);