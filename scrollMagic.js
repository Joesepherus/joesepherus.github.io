var sectionScrolling = false;


				var div = 0; // current div
	
		var scrollTimer, lastScrollFireTime = 0;
				var scrollPosition = 0;
		var scrollDirection = ""; 
		window.addEventListener('wheel', function(event){
			if(event.deltaY < 0){
				//console.log("LAMOOOOOO");
				scrollDirection = "up";
				if (scrollPosition >=0) {
					scrollPosition -=115;
				}
				else {
					scrollPosition = 0
				}
			}
			else {
				scrollDirection = "down";
				if (scrollPosition < document.body.scrollHeight){
					scrollPosition +=115;
				}		
				else {
					scrollPosition = document.body.scrollHeight - 600;
				}
				
			}
			
			console.log("DIV: " + div);
			if (sectionScrolling) {
				
				var i = 0;
				console.log(scrollPosition);
				$('.playlist').each(function () {
					var currentDiv = $(this);
					var currentImg = $(currentDiv).find(".playlistImg");
					//console.log("DOPICE" + scrollPosition);
					//console.log(currentImg.offset().top - 100, scrollPosition,  currentImg.offset().top + currentImg.height() - 60);
					if (currentImg.offset().top - 100 <= scrollPosition && currentImg.offset().top + currentImg.height() - 60 > scrollPosition) {
						totalHeight = 600;
						if (!isNaN(i)){
							//console.log("DICK" + i);
							div = i;
						}
						$(this).closest(".playlist").find("div.description")
							.css({
								// Set height to prevent instant jumpdown when max height is removed
								"height": $(this).closest(".playlist").find("div.description").height(),
								"max-height": 9999
							})
							.animate({
								"height": totalHeight
							}, 2000);
						$(currentImg).css('opacity', 1);
						$(currentDiv).find("p.description").removeClass("descriptionPara");
						$(currentDiv).find("p.description").addClass("descHighlited");
						$(currentDiv).find("iframe").css("visibility", "visible");										
					}
					else{
						$(currentImg).css('opacity', 0.5);
						$(currentDiv).find("p.description").addClass("description");
						$(currentDiv).find("p.description").removeClass("descHighlited");
						$(currentDiv).find("div.description").css("height", 60);	
							//console.log("DOKOKOTOVA " + i + " " +$(currentDiv).find("inframe").visibility();						
						$(currentDiv).find("iframe").css("visibility", "hidden");				
						$(this).closest(".playlist").find("div.description").stop( true, true ).animate();
					}
					i++;
				});
			}
			else {
				processScroll();
					/*var minScrollTime = 2000;
					var now = new Date().getTime();

					if (!scrollTimer) {
						if (now - lastScrollFireTime > (3 * minScrollTime)) {
							processScroll();   // fire immediately on first scroll
							lastScrollFireTime = now;
						}
						scrollTimer = setTimeout(function() {
							scrollTimer = null;
							lastScrollFireTime = new Date().getTime();
							processScroll();
						}, minScrollTime);
					}*/

				function processScroll(event){
					var scrollPosition = $(document).scrollTop();
							//console.log(scrollPosition);
					
						
					var divs = $('.playlist');
					var dir = 'up'; // wheel scroll direction
						if (scrollDirection == "down") {
							dir = 'down';
								//console.log(divs[div].offset().top);
							var scroll;
							if(div == 0) {
								scroll = 140;
							}
							else {
								scroll = 120 * div + 80 * div + 140 ;
							}
							//console.log("leghth" + divs.length);
							if (div > divs.length - 1) {
								div = divs.length - 1;
								return;
							}
							else {
								div++;

							}
							$('html,body').stop().animate({
									scrollTop: scroll
								}, 1000);	
							/*$(window).resize(function () {
								$('html,body').scrollTop(scroll);
							});*/

						} 
						else {
							dir = 'up';
							if (div <= 0) {
								div = -1;
							}
							else {
								div--;
							}
							//var scroll = scrollPosition - 310;	
							var scroll = (div - 1) * 200 + 140;
							//console.log(divs[div].offset().top);
							/*$(window).resize(function () {
								$('html,body').scrollTop(scroll);
							});*/
							$('html,body').stop().animate({
								scrollTop: scroll
							}, 1000);
						}
					
					divs.each(function(i){
						currentDiv = divs[i];
						if (div == i) {
							totalHeight = 600;
							$(currentDiv).find("div.description")
								.css({
									// Set height to prevent instant jumpdown when max height is removed
									"height": $(currentDiv).find("div.description").height(),
									"max-height": 9999
								})
								.animate({
									"height": totalHeight
								}, 1000);
							$(currentDiv).find("img.playlistImg").css('opacity', 1);
							$(currentDiv).find("p.description").removeClass("descriptionPara");
							$(currentDiv).find("p.description").addClass("descHighlited");
							$(currentDiv).find("iframe").css("visibility", "visible");	
							console.log("??????? " + i);			
						}
						else {
							console.log("!!!!!!!!! " + i);			
							
							$(currentDiv).find("img.playlistImg").css('opacity', 0.5);
							$(currentDiv).find("p.description").addClass("description");
							$(currentDiv).find("p.description").removeClass("descHighlited");
							$(currentDiv).find("div.description").css("height", 60);		
							$(currentDiv).find("iframe").css("visibility", "hidden");													
							$(currentDiv).find("div.description").stop( true, true ).animate();
						}
					});				
				}
					
					
					// find currently visible div :
					/*div = -1;
					divs.each(function(i){
						if (div<0 && ($(this).offset().top >= $(window).scrollTop())) {
							div = i;
							var currentDiv = $(this);
								var currentImg = $(currentDiv).find(".playlistImg");
											var scrollPosition = $(document).scrollTop();
								
									totalHeight = 260;
									$(currentDiv).find("div.description")
										.css({
											"height": $(currentDiv).find("div.description").height(),
											"max-height": 9999
										})
										.animate({
											"height": totalHeight
										}, 2000);
									$(currentImg).css('opacity', 1);
									$(currentDiv).find("p.description").removeClass("descriptionPara");
									$(currentDiv).find("p.description").addClass("descHighlited");

									
						}
								else{
									console.log($(this));
									$(this).find("img.playlistImg").css('opacity', 0.5);
									$(this).find("p.description").addClass("description");
									$(this).find("p.description").removeClass("descHighlited");
									$(this).find("div.description").css("height", 60);				
									$(this).find("div.description").stop( true, true ).animate();
								}
					});
					if (dir == 'up' && div > 0) {
						div--;
					}
					if (dir == 'down' && div < divs.length) {
						div++;
					}
					console.log(divs.eq(div).offset().top -300);
					$('html,body').stop().animate({
						scrollTop: divs.eq(div).offset().top -300
					}, 1000);

					
					return false;
				});
				};
				$(window).resize(function () {
					$('html,body').scrollTop(divs.eq(div).offset().top);
				});*/
			}
		});
