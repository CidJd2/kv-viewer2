$(function() {

	var $data = $('#datas');
	var $key = $('#key');
	var $value = $('#value');

	var elementTemplate = $('#element-template').html();

	function addElement(element){
		$data.append(Mustache.render(elementTemplate, element));
	}

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/',
		success: function(data) {
			var jsData = JSON.parse(data);
			$.each(jsData, function(i, element) {
				addElement(element);
			});
		},
		error: function(data) {
			console.log('error loading data');
		}
	});

	$('#add-data').on('click', function() {

		var element = {
			key: $key.val(),
			value: $value.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/',
			data: element,
			success: function(newElement) {
				addElement(element);
			},
			error: function() {
				console.log('error adding new element');
			}
		})
	});

	$data.delegate('.hide','click', function() {
		var $currentButton = $(this);
		var $sib = $(this).siblings().last();
		$.each($sib, function(i, bro) {
			$(bro).toggle(500, function() {
				if($currentButton.text() == 'hide') {
					$currentButton.text('unhide');
				}
				else {
					$currentButton.text('hide');
				}
			});
		});
	});

	$('#clear-data').on('click', function() {

		var $dataList = $data.children();

		$.ajax({
			type: 'GET',
			url: 'http://localhost:8080/delete',
			success: function() {
				$.each($dataList, function(i, child) {
					$(child).fadeOut(2000, function() {
						$(this).remove();
					});
				});
			},
			error: function() {
				console.log('error when deleting data');
			},
		});

	});

});