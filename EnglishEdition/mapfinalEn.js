

var chart = am4core.create("mapfinal", am4maps.MapChart);
chart.homeZoomLevel = 0.8;

chart.geodata = am4geodata_greeceHigh;


chart.projection = new am4maps.projections.Miller();

chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.align = "right";
chart.zoomControl.marginRight = 15;
chart.zoomControl.valign = "middle";
chart.zoomEasing = am4core.ease.sinOut;
chart.chartContainer.wheelable = false;


var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

polygonSeries.useGeodata = true;
var backgroundColor = am4core.color("#004b76");
polygonSeries.interpolationDuration = 3;
var polygonTemplate = polygonSeries.mapPolygons.template;
// ...;
polygonTemplate.events.on("hit", function (ev) {
  ev.target.series.chart.zoomToMapObject(ev.target);
});

var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fill = am4core.color("#e5e5e5");
polygonTemplate.fillOpacity = 1;

var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.dataFields.value = "total_confirmed_cases";

var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#f14038");
circle.fillOpacity = 0.7;
circle.stroke = am4core.color("#fff");
circle.strokeWidth = 2;
circle.strokeOpacity = 0.7;
circle.nonScaling = true;
circle.tooltipText = `[bold]Camp {name_en} 
{region_en} [/]
--------------
Covid19 Cases: {total_confirmed_cases}
Capacity : {capacity}
Tests Made: {total_samples}
Last Update: {last update}
`;


imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longtitude";

imageSeriesTemplate.layout = "absolute";
imageSeriesTemplate.isMeasured = true;
var overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
overlap.targets.push(imageSeries.mapImages.template);

imageSeries.heatRules.push({
  target: circle,
  min: 8,
  max: 26,
  property: "radius",
});
var title = chart.titles.create();
title.fontSize = "1em";
title.text = "Covid19 Stats in Refugees Camps";
title.align = "left";
title.horizontalCenter = "left";
title.marginLeft = 30;
title.paddingBottom = 20;
title.fill = am4core.color("#ffffff");
title.y = 10;

// switcher 0 cases
var zeroSwitch = chart.createChild(am4core.SwitchButton);
zeroSwitch.align = "right"
zeroSwitch.y = 30;
zeroSwitch.leftLabel.text = "Camps with COVID19 ";
zeroSwitch.leftLabel.fill = am4core.color("#f14038");
zeroSwitch.rightLabel.fill = am4core.color("#f14038");
zeroSwitch.rightLabel.text = " Include 0 Cases";
zeroSwitch.rightLabel.interactionsEnabled = true;
zeroSwitch.leftLabel.fontSize = "0.8em";
zeroSwitch.rightLabel.fontSize = "0.8em";

AmCharts.ready(function() {

var serialChart = new AmCharts.AmSerialChart();
//serialChart.dataProvider = chartData[0];
serialChart.categoryField = "date";
serialChart.startDuration = 1;
serialChart.sequencedAnimation = true;
serialChart.categoryAxis.labelRotation = 45;


// VALUE AXIS
var valueAxis = new AmCharts.ValueAxis();
valueAxis.axisAlpha = 0.20;
valueAxis.minimum = 0;
valueAxis.dashLength = 4;
serialChart.addValueAxis(valueAxis);

// GRAPH
var graph = new AmCharts.AmGraph();
graph.type = "column";
graph.valueField = "confirmed";
graph.fillAlphas = 0.8;
graph.balloonText = "[[value]] confirmed";
graph.colorField = "color";
serialChart.addGraph(graph);

// WRITE
serialChart.write("chartdiv");

window.serialChart = serialChart;
});