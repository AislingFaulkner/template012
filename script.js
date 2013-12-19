// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    // example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
    //var canvas = document.getElementById("myCanvas");
    //var context = canvas.getContext("2d");
    var  canvas, context, toggle;
    var y= 220;
    var x= 0;
    var mid = 128;
    var dirX = 1;
    var dirY = 1;
    var destX=1 ;
    var destY=1 ;
    var i;
    var state ;
    var inbounds='true';
    var status = -1; // -1: stopped  , 0 In play	
    var imageObj = new Image();	
    var background_obj= new Image();
    var jump = 'rest';
    var backg_x = 0;
    var backg_y = 0;
    var floating =false;
    background_obj.src = "level_bounds.png";
    imageObj.src = "spshipsprite.png";
    var degrees = 0;
    var str;
    var name;
    //init();
    var dir = 1;
    var monster = {};
    var origin = {};
    // Bullet image
    var bulletReady = false;
    var bulletImage = new Image();
    bulletImage.onload = function () {

    //bulletReady = true;
    };
    bulletImage.src = "images/bullet.png";

    var bullet = {
	    speed: 256 // movement in pixels per second
    };
    canvas = document.createElement( 'canvas' );
    canvas.width = 568;
    canvas.height = 400;
    context = canvas.getContext( '2d' );
    // context.font = "40pt Calibri";
    // context.fillStyle = "white";
    // align text horizontally center
    context.textAlign = "center";
    // align text vertically center
    context.textBaseline = "middle";	
    //context.font = "12pt Calibri"; 

    canvas.width = 8248;
    context.drawImage(background_obj, backg_x, backg_y);
    imageData = context.getImageData(0,0,8248,400); //fnord
     	    
    //var x = document;
    canvas.width = 568;

    $( "#container" ).append( canvas );
        //}
    animate();


   if (bulletReady) {
	        context.drawImage(bulletImage, bullet.x, bullet.y);
	    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function animate()
    {
       requestAnimFrame( animate );
       update();
       shoot();
       draw();
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    function shoot()
    {
        if (dir==1){
            bullet.y -= bullet.speed  * 4;
        }
        if (dir==2){
            bullet.y += bullet.speed  * 4;
        }
        if (dir==3){
            bullet.x -= bullet.speed  * 4;
        }
        if (dir==4){
            bullet.x += bullet.speed  * 4;
        }

      //distance = square root sqrt  of ( (x2-x1)^2 + (y2-y1)^2)
        var distance = Math.sqrt(    Math.pow(bullet.x - x, 2) + Math.pow(bullet.y - y,2) );
        if (distance > 200)
        {
            bulletReady = false;
            first = true
        }
    }
////////
    function update()
    {
        context.fillText( state + ":" , canvas.width / 2 , canvas.height / 2 );
	    $(document).keyup(function(e)
	    {
		    if (e.keyCode == 37)
		    {
			    state= "stop";
			    dirX=1;
			    dir=3;	
		    }
		    if (e.keyCode == 39)
		    {
			    state= "stop";
			    dirX=1;
			    dir=4;	
		    }
		    if (e.keyCode == 38)
		    {
			    jump = 'descend';
		    }
        });
	    $(document).keydown(function(e) {
	    //alert (e.keyCode);
	    //if space start/stop gameloop
	    //var time = new Date().getTime() * 0.002;
        if(e.keyCode == 32)
		{
		    status = 0 - status;
		    bulletReady = true;
	        bullet.x = x;
            bullet.y = y;
		}
	    if (e.keyCode == 38 )
		{
            state = 'up';
		}
		if (e.keyCode == 40)
		{
            state = 'down';
		}
		if (e.keyCode == 37)
		{
			state = 'left';
		}
		if (e.keyCode == 39)
		{
			    state = 'right';
		}
	});
///////////////////////////////////////////////////////////////////////////////
	    if (state == 'left')
	       {
	       	    // x = x-(1 * dirX);
	       	    // backg_x = backg_x + 1 ;
	       	    degrees = degrees - 1;
	            //	context.setTransform(1,0.5,-0.5,10,10);
	       }
		if (state == 'right')
		    {
      		//x		= x + (1 * dirX);
	      	//	backg_x = backg_x - 1 ;
	      		degrees = degrees +1 ;
	      	//	context.setTransform(1,0.5,-0.5,1,10,10);
		    }
		if (state == 'up')
		    {
				    y = y + 1;
		    }
		if (state == 'down')
		    {
			    y = y - 1;
			    if (y == 0)
			    {
				    jump = 'rest';
			    }
		    }
		if (inbounds=='true')
		    {
			    destX = (canvas.width / 2 ) + x;
			    destY = canvas.height  - 30 - y			;// 60 pixels offset from centre
		    }//end if inbounds
		if (destX > canvas.width || destX < 0)
		    {
       		//	dirX =-dirX;
        	}
		if (destY > canvas.width || destY < 0)
		    {
      			//	dirY =-dirY;
		    }
		    //canvas.width = 8248;
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function draw() 
    {
		    context.clearRect(0,0 , canvas.width, canvas.height);
		    // move the rotation point to the center of the rect
            //   context.translate( destX, destY );
	        // rotate the rect
	        //context.rotate(50*Math.PI/180);
	     
		    context.drawImage(background_obj, backg_x, backg_y);
            context.save();
            context.beginPath();
	     	context.translate( destX,destY);
	     	//context.translate( 200,200);
            // rotate the rect
            context.rotate(degrees*Math.PI/180);
		    //context.drawImage(imageObj, 10, 10);
		    context.drawImage(imageObj, destX-200, destY-200);
     		context.restore();
		    str = "width=" + imageData.width + " height=" +	imageData.height 
		    //+ " red :" + red  + " green :" + green + " blue :" + blue  
		    + " destX :" + parseInt(0-backg_x)  + " destY :" +destY 
		    + " inbounds:" + inbounds  
		    + " float: " + floating + " jump : " + jump;

		    context.fillText(str, 20, 14);
		    str2   = "x: " + x + "y :" + y;
		    context.fillText(str2, 20, 34);
		    context.fillStyle = 'white';
	    }
