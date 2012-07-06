$(function(){
    
    
    function viewport() {
		return {
			x: $(window).scrollLeft(),
			y: $(window).scrollTop(),
			cx: $(window).width(),
			cy: $(window).height()
		};
	}
    
    function findOffset(obj) {
        
        var objectOffset = obj.offset();
        
        return {
            top: objectOffset.top,
            left: objectOffset.left
        }
    }

    var ToolTip = function(width){
        this.container = '<div id="tooltip-container" style="position: fixed"></div>';
        this.containerWidth = parseInt(width);
    }
    
    var tooltip = new ToolTip(300),
        tooltipContainer = $(tooltip.container),
        viewPort = viewport();

    $('body')
        .append(tooltipContainer)
        .find(tooltipContainer)
        .css({
            'width': tooltip.containerWidth
        });
        
        
        
    $('li')
        .bind('mouseenter mouseleave', function(e){
            var containerText = $(this).html();
            
            if(e.type === 'mouseenter') {
                tooltipContainer
                    .html(containerText)
                    .css({
                        'visibility': 'visible'
                    });
                    
                $(document)
                    .bind('mousemove', function(e){
                        
                        var containerOffset = findOffset(tooltipContainer),
                            viewPort = viewport(),
                            containerX = (e.pageX + tooltip.containerWidth) < viewPort.cx ? e.pageX + 15 : (e.pageX - (tooltip.containerWidth + 30)  ),
                            containerY = (e.pageY + tooltipContainer.height()) < viewPort.cy ? e.pageY + 15 : (e.pageY -( tooltipContainer.height() + 30)) ;
                        
                        tooltipContainer
                            .css({
                               'left': containerX,
                               'top': containerY
                            });
                    });
            } else {
                tooltipContainer
                    .html('')
                    .css({
                        'visibility': 'hidden'
                    });;
                    
                $(document)
                    .unbind('mousemove');
            }
        });
});