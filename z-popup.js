
document.addEventListener('DOMContentLoaded', function() {

	var addFolderBtn = document.getElementById('add-folder');
	addFolderBtn.addEventListener('click', function(){
		chrome.tabs.query({
		    active: true,
		    currentWindow: true
		  }, function (tabs) {
		    chrome.tabs.sendMessage(
		        tabs[0].id,
		        {from: 'popup', subject: 'DOMInfo'},
		        setDOMInfo);
		  });
	});

	function setDOMInfo(info) {
	  console.log(info)
	}

});
