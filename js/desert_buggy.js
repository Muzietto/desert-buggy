var DesertBuggy = (function(){
  var DesertBuggy
  ;

  DesertBuggy = function(params) {
    this.state = params;
  }

  DesertBuggy.prototype.set = function(key, event) {
    var value = event.target.value,
    self = this
    ;
    this.state[key] = value;
    if (key !== 'rpm') return false;
    // change rpm icon
    var speedRangesAndIcons = {
      '1000-1800': 'torque_1.jpg',
      '1801-2600': 'torque_2.jpg',
      '2601-3500': 'torque_3.jpg',
      '3501-4400': 'torque_4.jpg',
      '4401-5200': 'torque_5.jpg',
      '5201-6000': 'torque_6.jpg',
    };
    Object.keys(speedRangesAndIcons).forEach(function(range) {
      var limits = range.split('-')
      ;
      if (parseInt(limits[0]) <= value 
            && parseInt(limits[1]) >= value) {
        $('.torqueChoice', self.state.$parent)
          .css('background-image', 'url(\'../img/'
            + speedRangesAndIcons[range] + '\')');
        return;
      }
    });
    return false;
  }

  DesertBuggy.prototype.calculateSpeed = function() {
    var resultSpeed = calculate(this.state)
    ;
    $('.TEXT_calculatedSpeed', this.state.$parent).text(resultSpeed + ' km/h');
    $('.page1', this.state.$parent).fadeOut();
    $('.page2', this.state.$parent).fadeIn();    
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

  DesertBuggy.prototype.goBack = function() {
    $('.page2', this.state.$parent).fadeOut();
    $('.page1', this.state.$parent).fadeIn();    
  }

  DesertBuggy.prototype.init = function() {
    var self = this
    ;
    $('.colorpicker', this.state.$parent).farbtastic('.colorIcon');
    $('.colorIcon', this.state.$parent).css('background-color', '#FF0000');
    $('[name=driverSeat]', this.state.$parent).change(function(ev) { return self.set('driverSeat', ev); });
    $('input[type=range]', this.state.$parent).change(function(ev) { return self.set('rpm', ev); });
    $('.calculate .button', this.state.$parent).click(self.calculateSpeed.bind(self));
    $('.results', this.state.$parent).click(self.goBack.bind(self));

    return this;
  }

  return DesertBuggy;
})();