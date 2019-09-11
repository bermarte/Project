(() => {

    function getWeekDay(date) {
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[date];
    }
    //https://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript
    //3
    function roundOf(n, p) {
        const n1 = n * Math.pow(10, p + 1);
        const n2 = Math.floor(n1 / 10);
        if (n1 >= (n2 * 10 + 5)) {
            return (n2 + 1) / Math.pow(10, p);
        }
        return n2 / Math.pow(10, p);
    }

    document.getElementById("sub").addEventListener("click", queryData);

    function queryData() {

        search = document.getElementById("cityQuery").value;
        results = document.getElementById("results");

        if (search === "") {
            console.log("no data given");
            document.getElementById("message").innerHTML = "<p>no data given</p>";
            return;
        }

       // document.getElementById("cityQuery").value = search;
        /*
        query now
        http://api.openweathermap.org/data/2.5/weather
        queryString = "http://api.openweathermap.org/data/2.5/weather?q="+search+"&units=metric&appid=e91d2f269f5365bb90dc6b8c3ded940a";
        */
        console.log("begin:")
        console.log("search", search);
        queryString = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=metric&appid=e91d2f269f5365bb90dc6b8c3ded940a";
        console.log("*********");
        console.log("now query:");
        console.log(queryString);
        console.log("*********");
        fetch(queryString)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log("*********");
                console.log("now data:", data);
                main = data.weather[0].main;
                console.log(main);
                description = data.weather[0].description;
                console.log(description);
                humidity = data.main.humidity;
                console.log("humidity", humidity);
                temp = data.main.temp;
                console.log("temp", temp);
                temp_max = data.main.temp_max;
                console.log("temp max", temp_max);
                temp_min = data.main.temp_min;
                console.log("temp min", temp_min);
                icon = data.weather[0].icon;
                console.log("icon", icon);
                console.log("*********");
            });

        /*
        query 5 days
        http://api.openweathermap.org/data/2.5/forecast

        */

        queryString = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=metric&appid=e91d2f269f5365bb90dc6b8c3ded940a";
        console.log("*********");
        console.log("5 days query:");
        console.log(queryString);
        console.log("*********");

        fetch(queryString)
            .then(function (response) {

                return response.json();
            })

            .then((data) => {
                console.log("*********");
                console.log("5 days data");
                console.log(data);
                console.log("**********");

                document.getElementById("message").innerHTML = "<p>you searched for <span class='bold text-grey text-darken-4'>" + search + "</span></p><div class='divider teal lighten-3'></div>";


                let day_1 = [];
                let day_2 = [];
                let day_3 = [];
                let day_4 = [];
                let day_5 = [];

                let indexes = [];
                const days_repetitions = [];

                for (i = 0; i < data.list.length; i++) {
                    date = new Date(data.list[i].dt_txt);
                    days_repetitions.push(date.getDay());
                    indexes.push(i);
                }
                console.log("*********");
                console.log("array of all the days of the week we have in our data (0 is sunday)");
                console.log(days_repetitions);
                console.log("*********");
                var daysSet = new   Set(days_repetitions);
                var days = Array.from(daysSet);
                console.log("*********");
                console.log("array of the set of all the days of the week in our data");
                console.log(days);
                console.log("*********");
                console.log("array of all the indexes of the days of the week we have in our data");
                console.log(indexes);
                console.log("*********");

                //https://stackoverflow.com/questions/34615493/count-duplicates-in-an-array?noredirect=1&lq=1

                var counts = {};

                days_repetitions.forEach(function (x) {
                    counts[x] = (counts[x] || 0) + 1;
                });

                //build five arrays of days
                console.log("*********");
                console.log("arrays of days: how many");
                dayN = days[0];
                console.log(days[0] + ": " + counts[dayN]);
                item_first_day = counts[dayN];
                dayN = days[1];
                item_second_day = counts[dayN];
                console.log(days[1] + ": " + counts[dayN]);
                dayN = days[2];
                item_third_day = counts[dayN];
                console.log(days[2] + ": " + counts[dayN]);
                dayN = days[3];
                item_fourth_day = counts[dayN];
                console.log(days[3] + ": " + counts[dayN]);
                dayN = days[4];
                item_fifth_day = counts[dayN];
                console.log(days[4] + ": " + counts[dayN]);
                console.log("*********");

                for (i = 0; i < item_first_day; i++) {

                    day_1.push(indexes[i]);

                }
                for (i = 0; i < item_second_day; i++) {

                    day_2.push(indexes[day_1.length + i]);

                }
                for (i = 0; i < item_third_day; i++) {

                    day_3.push(indexes[day_1.length + day_2.length + i]);

                }
                for (i = 0; i < item_fourth_day; i++) {

                    day_4.push(indexes[day_1.length + day_2.length + day_3.length + i]);

                }
                for (i = 0; i < item_fifth_day; i++) {

                    day_5.push(indexes[day_1.length + day_2.length + day_3.length + day_4.length + i]);

                }

                console.log("*********");
                console.log("arrays of days and values");
                console.log(day_1);
                console.log(day_2);
                console.log(day_3);
                console.log(day_4);
                console.log(day_5);
                console.log("*********");


                //html variables
                /* first day */
                data_day_1c =  new Date(data.list[day_1[0]].dt_txt);
                data_day_1b = data_day_1c.getDay();
                data_day_1 = getWeekDay(data_day_1b);
                console.log("data_day_1", data_day_1);

                /* second day */
                data_day_2c =  new Date(data.list[day_2[0]].dt_txt);
                data_day_2b = data_day_2c.getDay();
                data_day_2 = getWeekDay(data_day_2b);
                console.log("data_day_2", data_day_2);

                /* third day */
                data_day_3c =  new Date(data.list[day_3[0]].dt_txt);
                data_day_3b = data_day_3c.getDay();
                data_day_3 = getWeekDay(data_day_3b);
                console.log("data_day_3", data_day_3);

                /* fourth day */
                data_day_4c =  new Date(data.list[day_4[0]].dt_txt);
                data_day_4b = data_day_4c.getDay();
                data_day_4 = getWeekDay(data_day_4b);
                console.log("data_day_4", data_day_4);

                /* fifth day */
                data_day_5c =  new Date(data.list[day_5[0]].dt_txt);
                data_day_5b = data_day_5c.getDay();
                data_day_5 = getWeekDay(data_day_5b);
                console.log("data_day_5", data_day_5);

                /**************************************/
                //temperatures
                /* first day */
                sum = 0;
                for (i=0;i<day_1.length;i++){
                    sum += parseFloat(data.list[day_1[i]].main.temp);
                }
                //add now data
                sum +=temp;
                many = day_1.length;
                day_1_tmp_b = sum/(many+1);
                day_1_tmp = roundOf(day_1_tmp_b, 2);

                /* second day */
                sum = 0;
                for (i=0;i<day_2.length;i++){
                    sum += parseFloat(data.list[day_2[i]].main.temp);
                }
                many = day_2.length;
                day_2_tmp_b = sum/many;
                day_2_tmp = roundOf(day_2_tmp_b, 2);

                /* third day */
                sum = 0;
                for (i=0;i<day_3.length;i++){
                    sum += parseFloat(data.list[day_3[i]].main.temp);
                }
                many = day_3.length;
                day_3_tmp_b = sum/many;
                day_3_tmp = roundOf(day_3_tmp_b, 2);

                /* fourth day */
                sum = 0;
                for (i=0;i<day_4.length;i++){
                    sum += parseFloat(data.list[day_4[i]].main.temp);
                }
                many = day_4.length;
                day_4_tmp_b = sum/many;
                day_4_tmp = roundOf(day_4_tmp_b, 2);

                /* fifth day */
                sum = 0;
                for (i=0;i<day_5.length;i++){
                    sum += parseFloat(data.list[day_5[i]].main.temp);
                }
                many = day_5.length;
                day_5_tmp_b = sum/many;
                day_5_tmp = roundOf(day_5_tmp_b, 2);

                /**************************************/
                //min-temperatures
                /* first day */
                sum = 0;
                for (i=0;i<day_1.length;i++){
                    sum += parseFloat(data.list[day_1[i]].main.temp_min);
                }
                //add now data
                sum += temp_min;
                many = day_1.length;
                day_1_tmp_min_b = sum/(many+1);
                day_1_tmp_min = roundOf(day_1_tmp_min_b, 2);

                /* second day */
                sum = 0;
                for (i=0;i<day_2.length;i++){
                    sum += parseFloat(data.list[day_2[i]].main.temp_min);
                    console.log("data.list[day_2[i]].main.temp_min",data.list[day_2[i]].main.temp_min, "sum", sum);
                }
                many = day_2.length;
                day_2_tmp_min_b = sum/many;
                day_2_tmp_min = roundOf(day_2_tmp_min_b, 2);

                /* third day */
                sum = 0;
                for (i=0;i<day_3.length;i++){
                    sum += parseFloat(data.list[day_3[i]].main.temp_min);
                }
                many = day_3.length;
                day_3_tmp_min_b = sum/many;
                day_3_tmp_min = roundOf(day_3_tmp_min_b, 2);

                /* fourth day */
                sum = 0;
                for (i=0;i<day_4.length;i++){
                    sum += parseFloat(data.list[day_4[i]].main.temp_min);
                }
                many = day_4.length;
                day_4_tmp_min_b = sum/many;
                day_4_tmp_min = roundOf(day_4_tmp_min_b, 2);

                /* fifth day */
                sum = 0;
                for (i=0;i<day_5.length;i++){
                    sum += parseFloat(data.list[day_5[i]].main.temp_min);
                }
                many = day_5.length;
                day_5_tmp_min_b = sum/many;
                day_5_tmp_min = roundOf(day_5_tmp_min_b, 2);

                /**************************************/
                //max-temperatures
                /* first day */
                sum = 0;
                for (i=0;i<day_1.length;i++){
                    sum += parseFloat(data.list[day_1[i]].main.temp_max);
                }
                //add now data
                sum += temp_max;
                many = day_1.length;
                day_1_tmp_max_b = sum/(many+1);
                day_1_tmp_max = roundOf(day_1_tmp_max_b, 2);

                /* second day */
                sum = 0;
                for (i=0;i<day_2.length;i++){
                    sum += parseFloat(data.list[day_2[i]].main.temp_max);
                }
                many = day_2.length;
                day_2_tmp_max_b = sum/many;
                day_2_tmp_max = roundOf(day_2_tmp_max_b, 2);

                /* third day */
                sum = 0;
                for (i=0;i<day_3.length;i++){
                    sum += parseFloat(data.list[day_3[i]].main.temp_max);
                }
                many = day_3.length;
                day_3_tmp_max_b = sum/many;
                day_3_tmp_max = roundOf(day_3_tmp_max_b, 2);

                /* fourth day */
                sum = 0;
                for (i=0;i<day_4.length;i++){
                    sum += parseFloat(data.list[day_4[i]].main.temp_max);
                }
                many = day_4.length;
                day_4_tmp_max_b = sum/many;
                day_4_tmp_max = roundOf(day_4_tmp_max_b, 2);

                /* fifth day */
                sum = 0;
                for (i=0;i<day_5.length;i++){
                    sum += parseFloat(data.list[day_5[i]].main.temp_max);
                }
                many = day_5.length;
                day_5_tmp_max_b = sum/many;
                day_5_tmp_max = roundOf(day_5_tmp_max_b, 2);

                /**************************************/
                //humidity
                /* first day */
                sum = 0;
                for (i=0;i<day_1.length;i++){
                    sum += parseFloat(data.list[day_1[i]].main.humidity);
                }
                many = day_1.length;
                day_1_humidity_b = sum/many;
                day_1_humidity = roundOf(day_1_humidity_b, 2);

                /* second day */
                sum = 0;
                for (i=0;i<day_2.length;i++){
                    sum += parseFloat(data.list[day_2[i]].main.humidity);
                }
                many = day_2.length;
                day_2_humidity_b = sum/many;
                day_2_humidity = roundOf(day_2_humidity_b, 2);

                /* third day */
                sum = 0;
                for (i=0;i<day_3.length;i++){
                    sum += parseFloat(data.list[day_3[i]].main.humidity);
                }
                many = day_3.length;
                day_3_humidity_b = sum/many;
                day_3_humidity = roundOf(day_3_humidity_b, 2);

                /* fourth day */
                sum = 0;
                for (i=0;i<day_4.length;i++){
                    sum += parseFloat(data.list[day_4[i]].main.humidity);
                }
                many = day_4.length;
                day_4_humidity_b = sum/many;
                day_4_humidity = roundOf(day_4_humidity_b, 2);

                /* fifth day */
                sum = 0;
                for (i=0;i<day_5.length;i++){
                    sum += parseFloat(data.list[day_5[i]].main.humidity);
                }
                many = day_5.length;
                day_5_humidity_b = sum/many;
                day_5_humidity = roundOf(day_5_humidity_b, 2);

                /**************************************/
                //icons
                /* first day: now data */
                iconurl_1 = "http://openweathermap.org/img/w/" + icon + ".png";
                icon_2 = data.list[day_2[3]].weather[0].icon;
                icon_3 = data.list[day_3[3]].weather[0].icon;
                icon_4 = data.list[day_4[3]].weather[0].icon;
                icon_5 = data.list[day_5[3]].weather[0].icon;

                iconurl_2 = "http://openweathermap.org/img/w/" + icon_2 + ".png";
                iconurl_3 = "http://openweathermap.org/img/w/" + icon_3 + ".png";
                iconurl_4 = "http://openweathermap.org/img/w/" + icon_4 + ".png";
                iconurl_5 = "http://openweathermap.org/img/w/" + icon_5 + ".png";


                //icon = data.weather[0].icon;
                /*
                icon = data.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                var imgdiv = "<img src='"+iconurl+"' alt='Weather icon'>";

                 */





                myHtml = "";
                  myHtml = "    <div class=\"container\">\n" +
                      "        <div class=\"row\">\n" +
                      "\n" +
                      "            <div class=\"col m5ths s12\">\n" +
                      "                <div class=\"card\">\n" +
                      "                    <div class=\"ellipsis teal lighten-5\">\n" +
                      "                        <span class=\"card-title \">"+data_day_1+"</span>\n" +
                      "                    </div>\n" +
                      "                    <div class=\"divider\"></div>\n" +
                      "                    <div class=\"card-content\">\n" +
                      "                    <img src='"+iconurl_1+"' alt='Weather icon'>"+
                      "                        <p class=\"temperature \">"+day_1_tmp+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>min-temp</b></p>\n" +
                      "                        <p>"+day_1_tmp_min+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>max-temp</b></p>\n" +
                      "                        <p>"+day_1_tmp_max+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p class=\"ellipsis \"><b>humidity</b></p>\n" +
                      "                        <p>"+day_1_humidity+"</p>\n" +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "\n" +
                      "            <div class=\"col m5ths s12\">\n" +
                      "                <div class=\"card\">\n" +
                      "                    <div class=\"ellipsis teal lighten-5\">\n" +
                      "                        <span class=\"card-title\">"+data_day_2+"</span>\n" +
                      "                    </div>\n" +
                      "                    <div class=\"divider\"></div>\n" +
                      "                    <div class=\"card-content\">\n" +
                      "                    <img src='"+iconurl_2+"' alt='Weather icon'>"+
                      "                        <p class=\"temperature \">"+day_2_tmp+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>min-temp</b></p>\n" +
                      "                        <p>"+day_2_tmp_min+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>max-temp</b></p>\n" +
                      "                        <p>"+day_2_tmp_max+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p class=\"ellipsis \"><b>humidity</b></p>\n" +
                      "                        <p>"+day_2_humidity+"</p>\n" +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "\n" +
                      "            <div class=\"col m5ths s12\">\n" +
                      "                <div class=\"card \">\n" +
                      "                    <div class=\"ellipsis teal lighten-5\">\n" +
                      "                        <span class=\"card-title \">"+data_day_3+"</span>\n" +
                      "                    </div>\n" +
                      "                    <div class=\"divider\"></div>\n" +
                      "                    <div class=\"card-content \">\n" +
                      "                    <img src='"+iconurl_3+"' alt='Weather icon'>"+
                      "                        <p class=\"temperature \">"+day_3_tmp+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>min-temp</b></p>\n" +
                      "                        <p>"+day_3_tmp_min+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>max-temp</b></p>\n" +
                      "                        <p>"+day_3_tmp_max+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p class=\"ellipsis \"><b>humidity</b></p>\n" +
                      "                        <p>"+day_3_humidity+"</p>\n" +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "\n" +
                      "            <div class=\"col m5ths s12\">\n" +
                      "                <div class=\"card\">\n" +
                      "                    <div class=\"ellipsis teal lighten-5\">\n" +
                      "                        <span class=\"card-title\">"+data_day_4+"</span>\n" +
                      "                    </div>\n" +
                      "                    <div class=\"divider\"></div>\n" +
                      "                    <div class=\"card-content\">\n" +
                      "                    <img src='"+iconurl_4+"' alt='Weather icon'>"+
                      "                        <p class=\"temperature \">"+day_4_tmp+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>min-temp</b></p>\n" +
                      "                        <p>"+day_4_tmp_min+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>max-temp</b></p>\n" +
                      "                        <p>"+day_4_tmp_max+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p class=\"ellipsis \"><b>humidity</b></p>\n" +
                      "                        <p>"+day_4_humidity+"</p>\n" +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "\n" +
                      "            <div class=\"col m5ths s12\">\n" +
                      "                <div class=\"card\">\n" +
                      "                    <div class=\"ellipsis teal lighten-5\">\n" +
                      "                        <span class=\"flow-text card-title\">"+data_day_5+"</span>\n" +
                      "                    </div>\n" +
                      "                    <div class=\"divider\"></div>\n" +
                      "                    <div class=\"card-content \">\n" +
                      "                    <img src='"+iconurl_5+"' alt='Weather icon'>"+
                      "                        <p class=\"temperature \">"+day_5_tmp+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>min-temp</b></p>\n" +
                      "                        <p>"+day_5_tmp_min+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p><b>max-temp</b></p>\n" +
                      "                        <p>"+day_5_tmp_max+"</p>\n" +
                      "                        <div class=\"divider\"></div>\n" +
                      "                        <p class=\"ellipsis \"><b>humidity</b></p>\n" +
                      "                        <p>"+day_5_humidity+"</p>\n" +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      "\n" +
                      "        </div>\n" +
                      "    </div>";

                results.innerHTML = myHtml;


                //end html
            })


            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                document.getElementById("message").innerHTML = "<p> nothing found, are you sure of the input?</p>";
            });

    }

})();


