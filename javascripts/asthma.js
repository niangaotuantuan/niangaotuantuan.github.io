var events = [{
  s: 0.84,
  e: 3.61,
  color: 'green',
  label: 'shake',
  content: "shake",
  vis: false
},{
  s: 4.82,
  e: 5.50,
  color: 'blue',
  label: 'exhale',
  content: "exhale",
  vis: false
},{
  s: 6.4,
  e: 7.4,
  color: 'purple',
  label: 'inhale&puff',
  content: "inhale-puff",
  vis: false
},{
  s: 7.4,
  e: 16,
  color: 'white',
  label: 'hold breath',
  content: "hold-breath",
  vis: false
},{
  s: 16,
  e: 18,
  color: 'blue',
  label: 'exhale',
  content: "exhale2",
  vis: false
}];

var pop;
$(document).ready(function(){
  var duration, timeline;
  pop = Popcorn("#vision");
  $("#vision").on("loadedmetadata",function(){
    duration = this.duration;
    timeline = new Timeline('vision','vision_timeline',duration,{width: $(this).width()});
  });

  $("#vision").on("timeupdate",function(e){
    for (i in events) {
      evt = events[i];
      if (!evt.vis && e.target.currentTime > evt.e) {
        timeline.addPeriod(evt.s,evt.e,evt.color,1,evt.label);
        evt.vis = true;
      }
    }
  });
  //pop.play();
  ts = [0]; 
  events.forEach(function(x){ts.push(x.e)});
  ts.push(events[events.length-1].e,19);

  for (var i = 1; i < ts.length; i++) {
    pop.footnote({
      start: ts[i-1],
      end: ts[i],
      target: "timeline",
      text: $(".hidden-footnote .s"+(i-1)).html()
    });
  }
  $("a[href='#home']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 100);
    return false;
  });

  $("a[data-toggle='lightbox']").colorbox();

  $(".depth-video-img video").on('timeupdate', function (e) {
    var ct = e.target.currentTime;
    var dur = e.target.duration;
    $(".line-for-video").css("left",(-2-(dur-ct)/dur*46)+"%");
  });

});
