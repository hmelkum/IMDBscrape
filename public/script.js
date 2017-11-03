google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

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
                title: 'Air Composition',
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
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ]);

    var options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: 'red' } }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
}

function drawTable() {
    $.ajax({
        url: "/data",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'linksCount');
            data.addColumn('number', 'wordsCount');

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
