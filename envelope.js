$(document).ready(function() {
	var ORIGINAL_HEIGHT_IN = 4.375;
	var ORIGINAL_WIDTH_IN = 5.75;

	var newHeight = ORIGINAL_HEIGHT_IN;
	var newWidth = ORIGINAL_WIDTH_IN;

	$("#height").val(3);  
	$("#width").val(4);


	/* $(".toggle-fold-lines").change(function() {
	$( ".fold-lines" ).toggle();
	});

	 function scaleEnvelope() {
		$("rect, line").attr("transform", "scale(" + Math.min(newWidth/ORIGINAL_WIDTH_IN, 1) + "," + Math.min(newHeight/ORIGINAL_HEIGHT_IN, 1) + ")");
	}

	$("#height").keyup(function() {
		console.log($(this).val());
		newHeight = $(this).val();
		scaleEnvelope();
	});

	$("#width").keyup(function() {
		console.log($(this).val());
		newWidth = $(this).val();
		scaleEnvelope();
	}); */

	$(".submit-button").click(function() {


		var scalableHeight = parseFloat($("#height").val());
		var scalableWidth = parseFloat($("#width").val());
		var scaleX = scalableWidth / ORIGINAL_WIDTH_IN;
		var scaleY = scalableHeight / ORIGINAL_HEIGHT_IN;

		console.log(scaleX);
		console.log(scaleY);

		console.log(scalableHeight);
		console.log(scalableWidth);

		var lengthUnit = $("#units").val();
		
		var doc = new jsPDF("L", lengthUnit, "letter");

		var hexColor = $(".color").val();
		var rgbColor = hexToRgb(hexColor);
		console.log(rgbColor.r, rgbColor.g, rgbColor.b);

		doc.setLineWidth(0.01)
		doc.setDrawColor(rgbColor.r, rgbColor.g, rgbColor.b); /* RGB color */

		/* fold-lines inner rectangle */
		doc.rect(3.0625 * scaleX, 2.375 * scaleY, scalableWidth, scalableHeight); 
		/* doc.rect(3.0625, 2.375, 5.75, 4.375); */

		/* edges of the side flaps that meet outside guidebox (left and right flaps only) */
		doc.line(0 * scaleX, 4.84375 * scaleY, 0 * scaleX, 4.28125 * scaleY);
		doc.line(11.875 * scaleX, 4.84375 * scaleY, 11.875 * scaleX, 4.28125 * scaleY);

		/* lines from face corner to first angle (top and bottom flaps) */
		doc.line(3.0625 * scaleX, 2.375 * scaleY, 3.21875 * scaleX, 1.9375 * scaleY); /* top left */
		doc.line(8.8125 * scaleX, 2.375 * scaleY, 8.65625 * scaleX, 1.9375 * scaleY); /* top right */

		doc.line(3.0625 * scaleX, 6.75 * scaleY, 3.21875 * scaleX, 7.1875 * scaleY); /* bottom left */
		doc.line(8.8125 * scaleX, 6.75 * scaleY, 8.65625 * scaleX, 7.1875 * scaleY); /* bottom right */

		/* lines from face corner to first angle (side flaps) */
		//doc.line(3.0625, 2.375, 2.5, 2.5); /* top left */
		//doc.line(3.0625, 6.75, 2.5, 6.625); /* bottom left */

		doc.line(3.0625 * scaleX, 2.375 * scaleY, 2.5 * scaleX, 2.5 * scaleY); /* top left */
		doc.line(3.0625 * scaleX, 6.75 * scaleY, 2.5 * scaleX, 6.625 * scaleY); /* bottom left */

		doc.line(8.8125 * scaleX, 2.375 * scaleY, 9.375 * scaleX, 2.5 * scaleY); /* top right */
		doc.line(8.8125 * scaleX, 6.75 * scaleY, 9.375 * scaleX, 6.625 * scaleY); /* bottom right */

		/* lines from small angle to edge (top and bottom flaps) */
		doc.line(3.21875 * scaleX, 1.9375 * scaleY, 5.9375 * scaleX, 0 * scaleY); /* top left */
		doc.line(8.65625 * scaleX, 1.9375 * scaleY, 5.9375 * scaleX, 0 * scaleY); /* top right */

		doc.line(3.21875 * scaleX, 7.1875 * scaleY, 5.9375 * scaleX, 9.375 * scaleY); /* bottom left */
		doc.line(8.65625 * scaleX, 7.1875 * scaleY, 5.9375 * scaleX, 9.375 * scaleY); /* bottom right */

		/* lines from face corner to first angle (side flaps) */
		doc.line(2.5 * scaleX, 2.5 * scaleY, 0 * scaleX, 4.28125 * scaleY); /* top left */
		doc.line(2.5 * scaleX, 6.625 * scaleY, 0 * scaleX, 4.84375 * scaleY); /* bottom left */

		doc.line(9.375 * scaleX, 2.5 * scaleY, 11.875 * scaleX, 4.28125 * scaleY); /* top right */
		doc.line(9.375 * scaleX, 6.625 * scaleY, 11.875 * scaleX, 4.84375 * scaleY); /* bottom right */

		doc.save('MyEnvelope.pdf');

	});

	//masonry

	var $container = $('#container');
	// initialize
	$container.masonry({
	  columnWidth: 1,
	  itemSelector: '.item'
	});

	//SVG mini drawing

	$("rect, line").attr("transform", "scale(.5 , .5)");

	$(window).resize((function() {
		var svgElementWidth = $("svg").width();
		var svgElementWidthResized = svgElementWidth - 570;
		$("rect, line").attr("transform", "scale(.5, .5), translate(" + svgElementWidthResized + ")");
	}));

	$(window).resize();


    $(".color").val("000000");
	$(".color").change(function() {
		var hex = $(this).val();
		$("rect, line").css({"stroke": "#" + hex}) 
	});

});