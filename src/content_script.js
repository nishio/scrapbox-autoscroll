//----------------------
$(function () {
    var speed = 200; // per sec
    var interval = 1000; // msec
    var time_to_wait_on_top = 3000; // msec
    var time_to_sleep = 60 * 1000; // msec

    var count_down_to_wake = 0;
    var target_top = 0;
    var prev_top = -speed;
    var finish_waiting = false;

    function start_countdown(){
	//console.log("detect mousemove/keydown")
	count_down_to_wake = time_to_sleep;
    }
    $(document).mousemove(start_countdown);
    $(document).keydown(start_countdown);
    
    
    
    function scroll(){
	var scrolling = setInterval(() => {
	    if(count_down_to_wake > 0){
		//console.log("sleeping. count down: " + count_down_to_wake)
		count_down_to_wake -= interval;
		return;
	    }
	    if(prev_top == $(document).scrollTop()){
		//console.log("finished");
		target_top = 0;
		prev_top = -speed;

		// choose random hover or top
		var xs = $(".hover");
		var N = xs.length;
		var i = Math.floor(Math.random() * (N + 1))
		if(i == N){
		    $(".project-home")[0].click();
		}else{
		    xs[i].click();
		}
		clearInterval(scrolling);
		setTimeout(scroll, time_to_wait_on_top);

	    }else{
		//console.log("not finished");
		target_top += speed * interval / 1000.0;
		$([document.documentElement, document.body]).animate({
		    scrollTop: target_top
		}, interval, "linear");
	    }
	    prev_top = $(document).scrollTop();
	}, interval);
    }

    setTimeout(scroll, time_to_wait_on_top);
});
