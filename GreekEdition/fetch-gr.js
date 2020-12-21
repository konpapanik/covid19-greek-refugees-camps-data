

const api_url = "https://covid-19-greece.herokuapp.com/refugee-camps";
const total_data_url = "https://covid-19-greece.herokuapp.com/total";

        let showAll = false;
        (async () => {
            const response = await fetch(api_url);
            const data = await response.json();
            window.raw_data = data["refugee-camps"];
for (let index = 0; index < raw_data.length; index++) {
const element = raw_data[index];
element["last update"] = moment(element["last update"]).format('DD/MM/YYYY');
}
 imageSeries.data = raw_data.filter((i) => i.total_confirmed_cases > 0);


//Total All camps
var sumcases = raw_data.reduce((accumulator, currentValue) => accumulator + currentValue.total_confirmed_cases, 0);
document.getElementById("sumcasesid").innerHTML = sumcases;
//total tests
var sumtests = raw_data.reduce((accumulator, currentValue) => accumulator + currentValue.total_samples, 0);
document.getElementById("sumtestsid").innerHTML = sumtests;

            var totalMainlandCases = raw_data
                .filter((i) => i.area_type_gr === "Ηπειρωτική")
                .reduce((a, b) => a + b.total_confirmed_cases, 0);
            var totalIslandCases = raw_data
                .filter((i) => i.area_type_gr === "Νησιωτική")
                .reduce((a, b) => a + b.total_confirmed_cases, 0);
            chart.data = [
                {
                    area_type_gr: "Ηπειρωτική",
                    total_confirmed_cases: totalMainlandCases, //THE SUM OF total_confirmed_cases in mainland
                },
                {
                    area_type_gr: "Νησιωτική",
                    total_confirmed_cases: totalIslandCases, ////THE SUM OF total_confirmed_cases in island
                },
            ];

            var list = raw_data
                .sort((a, b) => b.total_confirmed_cases - a.total_confirmed_cases)
                .slice(0, 5);

            var html = "";
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                html += "<tr>";
                html += `<td>${row.name_gr}</td>`;
                html += `<td>${row.total_confirmed_cases}</td>`;
                html += `<td>${row.total_samples}</td>`;
                html += "</tr>";
            }

            document.getElementById("t5Data").innerHTML = html;

            const groupBy = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };

            const all_bar_char_data = [];

            // Barchar data
            for (let index = 0; index < window.raw_data.length; index++) {
                const element = data["refugee-camps"][index];
                for (
                    let innerIndex = 0;
                    innerIndex < element.recorded_events.length;
                    innerIndex++
                ) {
                    const recorded_event = element.recorded_events[innerIndex];
                    if (recorded_event["case_detection_week"]) {
                        all_bar_char_data.push({
                            confirmed: recorded_event["confirmed_cases"],
                            date: recorded_event["case_detection_week"],
                            name: element["name_gr"],
"color":"#f14038"
                        });
                    }
                }
            }

            const groups = groupBy(all_bar_char_data, "name");
            const dataSetNames = [];
            let dataItemsHtml = `<select id="ddlCamps">`;
            const defaultSelected = "Νέα Δομή Καρά Τεπέ";

            for (const key in groups) {
                if (groups.hasOwnProperty(key)) {
                    if (groups[key].length > 0) {
                        dataSetNames.push(key);
                        dataItemsHtml += `<option ${key === defaultSelected ? "selected" : ""
                            }>${key}</option>`;
                    }
                }
            }
            dataItemsHtml += "</select>";

            document.getElementById("data-items").innerHTML = dataItemsHtml;

            function loadData(key) {
                serialChart.dataProvider = groups[key];
                serialChart.validateData();
                serialChart.animateAgain();
            }

            document.querySelector("#ddlCamps").addEventListener("change", function () {
                loadData(this.value);
            });

            setTimeout(function () {
                loadData(defaultSelected);
            }, 1000);

           zeroSwitch.events.on("hit", function (data) {
                showAll = !showAll;
                if (showAll) {
                    imageSeries.data = raw_data;
                } else {
                    imageSeries.data = raw_data.filter((i) => i.total_confirmed_cases > 0);
                }
            });

const totalDataResponse = await fetch(total_data_url);
            const totalData = await totalDataResponse.json();

            ComparativeCovid19Chart.data = [
                {
                    name: "Έλληνες",
                    value: totalData.cases.confirmed,
                },
                {
                    name: "Πρόσφυγες",
                    value: sumcases,
                },
            ];

            comchart.data = [
                {
                    category: "Κρούσματα COVID19",
                    value: sumcases,
                    full: 4000,
                },
                {
                    category: "COVID19 Tests",
                    value: sumtests,
                    full: 15000,
                },
            ];

        })();