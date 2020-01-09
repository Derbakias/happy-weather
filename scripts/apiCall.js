function getWeatherData(src, callback){
    const req = new XMLHttpRequest();
    
    req.open('GET', src, true);
    
    req.onload = () => {
      if(req.status ===  200) {
        const data = JSON.parse(req.responseText);
        callback(data);
      } else {
        data = 'Error 404(Not Found)';
        callback(data);
      }
    }
    req.send();
}

function getPhoto(src, callback) {
  const req = new XMLHttpRequest();
    
    req.open('GET', src, true);
    
    req.onload = () => {
      if(req.status ===  200) {
        const data = JSON.parse(req.responseText);
        callback(data);
      } else {
        data = 'Error 404(Not Found)';
        callback(data);
      }
    }
    req.send();
}