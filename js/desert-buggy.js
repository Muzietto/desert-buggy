var DesertBuggy = (function(){
  var DesertBuggy
  ;
  
  DesertBuggy = function(params) {
    this.state = params;
  }

  DesertBuggy.prototype.set = function(key, event) {
    this.state[key] = event.target.value;
    return false;
  }

  DesertBuggy.prototype.calculateSpeed = function() {
    var resultSpeed = calculate(this.state);
    $('#TEXT_calculatedSpeed').text(resultSpeed + ' km/h');
    $('#page1').fadeOut();
    $('#page2').fadeIn();
    return false;
    
    function calculate(state) {
      var dSpeed = (state.driverSeat==='left') ? 100 : 150,
      cSpeed = Math.random() * 50,
      rSpeed = state.rpm/20,
      totalSpeed = Math.round((dSpeed + cSpeed + rSpeed)/2)
      ;
      return totalSpeed;
    }
  }
  
  return DesertBuggy;
})();