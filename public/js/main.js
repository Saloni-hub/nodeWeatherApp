const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp_real_val');
const data_hide = document.querySelector('.middle_layer');
const temp_status = document.getElementById('temp_status');

const getInfo = async(e) => {
    e.preventDefault();
    let cityVal = cityName.value;
    if(cityVal ===""){
        city_name.innerText = "Please write the city name before search";
        data_hide.classList.add('data_hide');
    } else{
       try {
        let url =`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b4219601f4c3101adcbae1157487704d`;
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];
        city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
        console.log(arrData);
        temp.innerText=arrData[0].main.temp;
         const tempMod = arrData[0].weather[0].main;
         if(tempMod === "Clear"){
             temp_status.innerHTML = 
                      `<i class='far fa-sun'  style='color:#eccc68;'></i>`;
         } else if(tempMod === "Clouds"){
            temp_status.innerHTML = 
                     `<i class='fas fa-cloud'  style='color:#f1f2f6;'></i>`;
        } else if(tempMod === "Rain"){
            temp_status.innerHTML = 
                     `<i class='far fa-rain'  style='color:#a4b0be;'></i>`;
        } else {
                temp_status.innerHTML = 
                         `<i class='fas fa-cloud' style='color:#f1f2f6;'></i>`;
        }
        data_hide.classList.remove('data_hide');
       } catch (error) {
        city_name.innerText = "Please enter  the city name properly";
        data_hide.classList.add('data_hide');
       }

    }
}
submitBtn.addEventListener('click',getInfo);
