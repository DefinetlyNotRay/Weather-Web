<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

    <title>Weather :D</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script src="script/script.js" defer></script>
    <insert rel="stylesheet" href="styles/general.css"></insert>
    <link rel="stylesheet" href="styles/styles.css">
    <script src="https://kit.fontawesome.com/b6a16ff751.js" crossorigin="anonymous"></script>

</head>
<body>

    <div class="container-box">   
        <form  method="get">
            <div class="Search-box"> 
                <input placeholder="Enter Location" class="location-input" onkeydown="handleKeyDown(event)">
                <button class="search-button" onclick="dropDown()"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </form>
            <div class="data">
                <div class="current-data">
                    <div class="data-details">
                        <h1 class="location-name">_________</h1>

                            <img class="img-element" id="myImage" src="">
                        

                        <p class="weather__Txt"></p>
                        <p class="temperature">Temperature: <span></span></p>
                        <p class="wind">Wind: <span></span></p>
                        <p class="humidity">Humidity: <span></span></p>
                        <button class="theme-button1" id="theme-button"><img class="imgSVG" id="toggle-night" src="svg/moon-regular.svg"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>


<div class="dialy__hourly">
    <div class="hourly__daily">
        <div class="hourly__box">
            <h2>HOURLY FORECAST</h2>
        <div class="hourly__data">
                    <div class="hourly__datas">
                        <div class="hourly__details">
                            <div class="days">
                                <p class="idkss one"><span></span></p>
                                <p class="idkss one"><span></span></p>
                                <p class="idkss one"><span></span></p>
                                <p class="idkss one"><span></span></p>
                                <p class="idkss one"><span></span></p>
                            </div>
                            <div class="daily__image"> 
                                <img class="img_element daily" id="myImage1" src="">
                                <img class="img_element daily" id="myImage2" src="">
                                <img class="img_element daily " id="myImage3" src="">
                                <img class="img_element daily" id="myImage4" src="">
                                <img class="img_element daily" id="myImage5" src="ß">
                            </div>
                        <div class="daily">
                            <p class="temperature"><span></span></p>
                            <p class="temperature"><span></span></p>
                            <p class="temperature"><span></span></p>
                            <p class="temperature"><span></span></p>
                            <p class="temperature"><span></span></p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    
        <div class="daily__box">
            <h2>DAILY FORECAST</h2>
        <div class="daily__data">
                    <div class="daily__datas">
                        <div class="daily__details">
                            <div class="days">
                                <p class="day one"><span></span></p>
                                <p class="day one"><span></span></p>
                                <p class="day one"><span></span></p>
                                <p class="day one"><span></span></p>
                                <p class="day one"><span></span></p>
                            </div>
                            <div class="daily__image"> 
                                <img class="img-daily one" id="myImage1" src="">
                                <img class="img-daily two" id="myImage2" src="">
                                <img class="img-daily three" id="myImage3" src="">
                                <img class="img-daily four" id="myImage4" src="">
                                <img class="img-daily five" id="myImage5" src="">
                            </div>
                            <div class="daily">
                                <p class="temperature__daily one"><span></span></p>
                                <p class="temperature__daily two"><span></span></p>
                                <p class="temperature__daily three"><span></span></p>
                                <p class="temperature__daily four"><span></span></p>
                                <p class="temperature__daily five"><span></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    
</body>
</html>