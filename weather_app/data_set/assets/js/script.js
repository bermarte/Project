(() => {

    function getWeekDay(date){
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[date];
    }

    document.getElementById("sub").addEventListener("click",queryData)


    function queryData(){
        const DAYS = 5;

        search = document.getElementById("cityQuery").value;

        if (search === ""){
            console.log("no data given");
            document.getElementById("message").innerHTML = "<p>no data given</p>";
            return;
        }


        document.getElementById("cityQuery").value = search;
        /*
        query today
        http://api.openweathermap.org/data/2.5/weather
        queryString = "http://api.openweathermap.org/data/2.5/weather?q="+search+"&units=metric&appid=e91d2f269f5365bb90dc6b8c3ded940a";
        */


        /*
        query 5 days
        http://api.openweathermap.org/data/2.5/forecast

        */

        queryString = "http://api.openweathermap.org/data/2.5/forecast?q="+search+"&units=metric&appid=e91d2f269f5365bb90dc6b8c3ded940a";
        console.log(queryString)


        fetch(queryString)
            .then(function (response) {

                return response.json();
            })

            .then( (data) => {
                console.log(data)

                console.log("**********")
                /*
                one day:
                console.log(data.weather[0].main)
                console.log(data.weather[0].description)
                console.log("humidity", data.main.humidity)
                console.log("pressure",data.main.pressure)
                console.log("temp",data.main.temp)
                console.log("temp max",data.main.temp_max)
                console.log("temp min",data.main.temp_min)
                */
                document.getElementById("message").innerHTML = "<p>you searched for <span class='bold text-grey text-darken-4'>"+search+"</span></p><div class='divider teal lighten-3'></div>";
                let results = document.getElementById("results");
                for (i=0,j=i+1; i < data.list.length, j < data.list.length ; i++,j++){

                    if (i===0){
                        results.innerHTML += "<div class='card-container'>";
                    }
                    date = new Date(data.list[i].dt_txt);

                    date0 = new Date(data.list[i].dt_txt);
                    date1 = new Date(data.list[j].dt_txt);
                    console.log(date);

                    humidity = "<b>humidity:</b> "+data.list[i].main.humidity;
                    temp = "<b>temp:</b> "+data.list[i].main.temp;
                    temp_max = "<b>temp-max:</b> "+data.list[i].main.temp_max;
                    temp_min = "<b>temp-min:</b> "+data.list[i].main.temp_min;
                    weather = "<b>"+data.list[i].weather[0].main;
                    icon = data.list[i].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                    var imgdiv = "<img src='"+iconurl+"' alt='Weather icon'>";

                    /*
                    var node = document.createElement("div");
                    var textnode = document.createTextNode(date0);
                    node.appendChild(textnode);
                    results.appendChild(node);

                    */

                    results.innerHTML += "<div class='item'>"+date0+"</div>";
                    results.innerHTML += "<div class='item'>"+weather+imgdiv+"</div>";
                    results.innerHTML += "<div class='item'>"+humidity+" "+temp_max+" "+temp_min+"</div>";

                    //results.innerHTML += date0;
                    if (date0.getDay() !== date1.getDay()){
                        console.log("new day");





                            results.innerHTML +="</container><container>";
                            results.innerHTML += "<div class=\"divider teal lighten-3\"></div>";



                    }
                    if (i === data.list.length-1){

                        results.innerHTML += "<div>end</div>";
                    }
                    /*
                    date0 = new Date(data.list[i].dt_txt)
                    date1 = new Date(data.list[j].dt_txt)
                    console.log("x",date0.getDay(),date1.getDay())

                     */
                    /*
                    date0 = new Date(data.list[i].dt_txt)
                    date1 = new Date(data.list[j].dt_txt)
                    console.log(date1);
                    console.log("*******");
                    console.log(date0.getDay(),date1.getDay())

                     */
                    //let day0 = getWeekDay(date0.getDay())
                    //let day1 = getWeekDay(date1.getDay())
                    //console.log(day0,day1);
                    //console.log(day);

                    //console.log(dates);

                    /*
                    if (dates.getDay()){

                    }

                     */
                }
                /*d0 = {"date": data.list[0].dt_txt,
                    "temp": data.list[i].main.

                 */


                //console.log(d0)
            })


    .catch(function(err) {
            console.log('Fetch Error :-S', err);
            document.getElementById("message").innerHTML = "<p> nothing found, are you sure of the input?</p>";
        });
        //api.openweathermap.org/data/2.5/weather?q=London&APPID=e91d2f269f5365bb90dc6b8c3ded940a
    }

})();


