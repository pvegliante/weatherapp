  var id = "fc9fca00cef8de8fc538fd56ba500a8f";
  var city = $('#city');
  var weather = $('#weather');
  var icon = $('#icon');
  var humidity = $('#humidity');
  var pressure = $('#pressure');
  var temp = $('#temp');
  var temp_max = $('#temp_max');
  var temp_min = $('#temp_min');
  var form = $('#form');
  var changetemp = $('#changetemp');
  var changetemp_max = $('#changetemp_max');
  var changetemp_min = $('#changetemp_min');

  getdata();

  form.submit(function(event) {
      event.preventDefault();
      getdata();
  });

  changetemp.click(function() {
    if(changetemp.html() === 'F') {
        changetemp.html('C');
        temp.html(ftoc(temp.html()))
    }
    else {
      changetemp.html('F');
      temp.html(ctof(temp.html()))
    }
  });
  changetemp_max.click(function() {
    if(changetemp_max.html() === 'F') {
        changetemp_max.html('C');
        temp_max.html(ftoc(temp_max.html()))
    }
    else {
      changetemp_max.html('F');
      temp_max.html(ctof(temp_max.html()))
    }
  });
  changetemp_min.click(function() {
    if(changetemp_min.html() === 'F') {
        changetemp_min.html('C');
        temp_min.html(ftoc(temp_min.html()))
    }
    else {
      changetemp_min.html('F');
      temp_min.html(ctof(temp_min.html()))
    }
  });


  function getdata() {
      $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + $('#zip').val() + ',us&appid=' + id,
          success: function(data) {
              console.log(data);
              city.html(data.name + ', ' + data.sys.country);
              weather.html(data.weather[0].description);
              icon.attr('src', setIcon(data.weather[0].id));
              humidity.html(data.main.humidity + '%');
              pressure.html(data.main.pressure);
              temp.html(ktof(data.main.temp));
              temp_max.html(ktof(data.main.temp_max));
              temp_min.html(ktof(data.main.temp_min));
              changetemp.html('F');
              changetemp_max.html('F');
              changetemp_min.html('F');
          }
      });
  }
  function ktof(kelvin) {
      return Math.round((kelvin - 273) * (9 / 5) + 32);
  }

  function ftoc(fahr) {
      return Math.round((fahr - 32) * (5 / 9));
  }

  function ctof(cel) {
        return Math.round((cel * (9 / 5)) + 32);
  }

  function setIcon(id){
      $('body').css({
      // 'background-image': 'url("./img/strikes1.jpg")'
    });
    if(id < 300) {
      $('body').css({
        // 'background-image': 'url(\'../img/lightning1.gif\')';

      });
      return './gifs/lightning2.gif';
    }
    if (id < 600) {
      return './gifs/rain.rain.gif';
    }
    if (id < 700) {
      return './gifs/snow.gif';
    }
    if (id === 800) {
      return './gifs/sun.gif';
    }
    if (id === 801) {
      return './gifs/partly-cloudy.gif';
    }
    if (id < 900) {
      return './gifs/cloudy.gif';
    }
  }
