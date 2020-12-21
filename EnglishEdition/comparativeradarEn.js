
am4core.useTheme(am4themes_animated);



var comchart = am4core.create("comparediv", am4charts.RadarChart);

// Add data
// comchart.data = [
//   {
//     category: "COVID19 Cases",
//     value: 771,
//     full: 5000,
//   },
//   {
//     category: "Tests Done",
//     value: 11606,
//     full: 20000,
//   },
// ];


comchart.startAngle = -90;
comchart.endAngle = 180;
comchart.innerRadius = am4core.percent(40);
comchart.numberFormatter.numberFormat = "#.#";


var categoryAxis = comchart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.fontWeight = 500;
categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
  return (target.dataItem.index >= 0) ? comchart.colors.getIndex(target.dataItem.index) : fill;
});
categoryAxis.renderer.minGridDistance = 10;

var valueAxis = comchart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.max = 15000;
valueAxis.strictMinMax = true;

// Create series
var series1 = comchart.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.valueX = "full";
series1.dataFields.categoryY = "category";
series1.clustered = false;
series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
series1.columns.template.fillOpacity = 0.08;
series1.columns.template.cornerRadiusTopLeft = 20;
series1.columns.template.strokeWidth = 0;
series1.columns.template.radarColumn.cornerRadius = 20;

var series2 = comchart.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.valueX = "value";
series2.dataFields.categoryY = "category";
series2.clustered = false;
series2.columns.template.strokeWidth = 0;
series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
series2.columns.template.radarColumn.cornerRadius = 20;

series2.columns.template.adapter.add("fill", function(fill, target) {
  return comchart.colors.getIndex(target.dataItem.index);
});

// Add cursor
comchart.cursor = new am4charts.RadarCursor();