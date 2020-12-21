

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);



var chart = am4core.create("pie1", am4charts.PieChart);

var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "total_confirmed_cases";
pieSeries.dataFields.category = "area_type_gr";
pieSeries.labels.template.text = "{category}: {value} κρούσματα";
pieSeries.slices.template.tooltipText = "{category}: {value} κρούσματα";
pieSeries.colors.list = [
  am4core.color("#762b00"),
am4core.color("#6694dc")
];


chart.innerRadius = am4core.percent(20);

pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template

.cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];

pieSeries.alignLabels = false;
pieSeries.labels.template.bent = true;
pieSeries.labels.template.radius = 3;
pieSeries.labels.template.padding(0,0,0,0);

pieSeries.ticks.template.disabled = true;

var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

var hoverState = pieSeries.slices.template.states.getKey("hover");

var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
hoverShadow.opacity = 0.7;
hoverShadow.blur = 5;

// Add a legend
chart.legend = new am4charts.Legend();

