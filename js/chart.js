import { STYLES } from './styles.js';

const CONTAINER = document.querySelector('.container').style;
const MILESTONES_CONTAINER = document.querySelector('.milestonesGroup');
const CHART_OVERLAY = document.querySelectorAll('.chart__title > span');
const BRAND_COLORS = ['#0088CC', '#0BD9AE', '#F1B144', '#CB157D'];
let data_from_json;
let toggle_btns;
let active_category;

// Get data for milestones
fetch('https://teamaton.github.io/discoverize-history/data/milestones.json')
    .then(response => response.json())
    .then(data => data.milestones)
    .then(data => {
        data.forEach(milestone => {
            MILESTONES_CONTAINER.innerHTML += `
                <div class="milestone">
                    <p class='milestone__date'>${milestone.date}</p>
                    <h3 class='milestone__title'>${milestone.title}</h3>
                </div>
            `;
        });

        document.querySelectorAll('.milestone').forEach(card => {
            let point_schrink;
            let point_grow;
            let point_index = parseInt(card.children[0].textContent) - 2007;  
            // Turn on pulse animation
            card.addEventListener('mouseenter',  () => {
                myChart.options.tooltips.enabled = false; 
                
                point_grow = setInterval(() => {
                    myChart.getDatasetMeta(0).data[point_index].custom = {
                        borderWidth: 13,
                        radius: 6
                    };
                    myChart.update();
                }, 500);
                point_schrink = setInterval(() => {
                    myChart.getDatasetMeta(0).data[point_index].custom = {
                        borderWidth: 6,
                    };
                    myChart.update();
                }, 1000);
            });
            // Turn off pulse animation
            card.addEventListener('mouseleave',  () => {
                clearInterval(point_grow);
                clearInterval(point_schrink);
                myChart.options.tooltips.enabled = true;
                let default_size = 6;
                // Check if its the point marking the launch of discoverize 
                if(point_index === 4){
                    default_size = 13;
                }
                myChart.getDatasetMeta(0).data[point_index].custom = {
                    borderWidth: default_size,
                    pointRadius: 2
                };
                myChart.update();
            });
        })
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


const UPDATE_CHART_OVERLAY = (active_category) => {
    let counter = 0;
    Object.values(active_category.overlay).forEach(txt => {
        CHART_OVERLAY[counter].textContent = txt;
        counter++;
    });
}

const UPDATE_CHART = () => {
    myChart.data.datasets[0].data = active_category.data;
    myChart.data.datasets[0].label = active_category.tooltipLabel;
    UPDATE_CHART_OVERLAY(active_category);
    myChart.update();
}

// Get data for the graph
fetch('https://teamaton.github.io/discoverize-history/data/graph_data.json')
    .then(response => response.json())
    .then(data => data.categories)
    .then(data => {
        data_from_json = data;
        let color_counter = 0;
        for (let category in data_from_json) {
            // Convert json to the state acceptable for chart.js
            data_from_json[category].data.forEach(data => {
                data.x = new Date(data.x, 1, 1);
            })
            // Display nav according to amount and type of categories
            document.querySelector('.btnsGroup').innerHTML += `
                <a href='#${category}' class='btn btn--toggle' theme_color=${BRAND_COLORS[color_counter]}>
                    ${category}
                </a>
            `;
            color_counter++;
            if(color_counter >= BRAND_COLORS.length){
                color_counter = 0;
            }
        }

        toggle_btns = document.querySelectorAll('.btn--toggle');
        // Display first data category
        active_category = Object.values(data_from_json)[0];
        UPDATE_CHART();
        
        myChart.getDatasetMeta(0).data[4].custom = {
            borderWidth: 13,
            pointRadius: 2
        };


        // Nav functionality and change of styles
        toggle_btns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                const UPDATE_STYLES = () => {
                    let new_color = btn.getAttribute('theme_color');

                    CONTAINER.background = new_color;
                    document.body.style.backgroundColor = new_color;
                    const MILESTONES = document.querySelectorAll('.milestone');
                    MILESTONES.forEach(card => {
                        card.children[0].style.backgroundColor = new_color;
                    });
                    
                    toggle_btns.forEach(btn => btn.classList.remove('btn--toggle--active'));
                    btn.classList.add('btn--toggle--active');
                }

                // Change active category 
                active_category = data_from_json[btn.textContent.replace(/\s/g, "")];
                UPDATE_STYLES();
                UPDATE_CHART();
            });
        });


        // Check if it was opened in new tab
        let active_hash = window.location.hash;
        if(active_hash){
            toggle_btns.forEach(btn => {
                if(btn.getAttribute('href') === active_hash){
                    btn.click();
                }
            })
        } else {
            // Activate first category
            toggle_btns[0].click();
        }

    });