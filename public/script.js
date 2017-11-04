google.charts.load('45', { packages: ['corechart', 'table'] });

google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawTable);

function drawPieChart() {
    var g = 0;
    var l = 0;
    $.ajax({
        url: "/data",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('number', 'wordsCount');

            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].rating > 8) {
                    g++;
                }
                else {
                    l++
                }
            }
            data.addRow([
                "Rating greater than 8",
                g
            ]);
            data.addRow([
                "Rating less than 8",
                l
            ]);

            var options = {
                legend: 'left',
                title: 'Rating Ratios',
                is3D: false,
                width: '100%',
                height: '100%'
            };

            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
}

function drawColumnChart() {

    var arryear = [];
    var arrRatingAv = [];

    $.ajax({
        url: "/data",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'year');
            data.addColumn('number', 'rating');

            for (var i = 0; i < jsonData.length; i++) {
                arryear.push(parseFloat(jsonData[i].date));
            }

            arryear.sort(function (a, b) { return a - b });
            for (var j = 0; j < arryear.length; j++) {
                for (var i = 0; i < arryear.length - 1; i++) {
                    if (arryear[i] == arryear[i + 1]) {
                        arryear.splice(i + 1, 1);
                        i = i - 2;
                    }
                }
            }
            for (var i = 0; i < arryear.length; i++) {
                var n = 0;
                var s = 0;
                for (var j = 0; j < jsonData.length; j++) {
                    if (arryear[i] == jsonData[j].date) {
                        s = s + parseFloat(jsonData[j].rating);
                        n++;
                        //arrRatingAv.push(parseFloat(jsonData[i].rating));
                    }

                }
                if (n == 0) { n = 1 }
                var av = s / n;
                arrRatingAv.push(av);
            }

            console.log(arryear);
            console.log(arrRatingAv);
            for (var i = 0; i < arryear.length; i++) {
                data.addRow([arryear[i], arrRatingAv[i]]);
             }
            var options = {
                title: 'Average rating - Year',
                hAxis: { title: 'Year', titleTextStyle: { color: 'red' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
}

function drawTable() {
    $.ajax({
        url: "/data",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'year');
            data.addColumn('number', 'rating');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].date,
                    parseFloat(jsonData[i].rating),
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            //formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawTable();
});

