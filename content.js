var sendButtons, wrapperDiv,
        zGbl_PageChangedByAJAX_Timer = '',
        _sendButtonClickHandler;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	console.log(msg)
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
  	var hasSendButtonOnPage = document.querySelector('div[aria-label*=Send]') !== null;
    if (hasSendButtonOnPage) {
        setUpAddFolderBtn();
    }else{
    	localMain();
    }
  }
});

function localMain() {
	console.log('localmain')
    if (typeof zGbl_PageChangedByAJAX_Timer === 'number') {
        clearTimeout (zGbl_PageChangedByAJAX_Timer);
        zGbl_PageChangedByAJAX_Timer  = '';
    }
    document.body.addEventListener ('DOMNodeInserted', pageBitHasLoaded, false);
}

function pageBitHasLoaded() {
	console.log('pagebit')
    if (typeof zGbl_PageChangedByAJAX_Timer === 'number') {
        clearTimeout (zGbl_PageChangedByAJAX_Timer);
        zGbl_PageChangedByAJAX_Timer = '';
    }

    zGbl_PageChangedByAJAX_Timer = setTimeout (function() {
        handlePageChange (); 
        console.log('666')
    }, 666);
}

function handlePageChange() {
    removeEventListener ('DOMNodeInserted', pageBitHasLoaded, false);
    console.log('page beres')
    var hasSendButtonOnPage = document.querySelector('div[aria-label*=Send]') !== null;
    if (hasSendButtonOnPage) {
        setUpAddFolderBtn();
    }
}

function setUpAddFolderBtn() {
    if (!document.querySelector('#zAddFolderBtn')) {

        sendButtons = document.querySelectorAll('div[aria-label*=Send]');
        console.log('***Sleep on it found ' + sendButtons.length + ' send buttons. Adding wrapper divs');

        for (var i = 0; i < sendButtons.length; i++) {
            var sendButton = sendButtons[i];

            wrapSendButton(sendButton);
        }

        //lightBoxUtil.addLightBoxCSS();
    }
}

function wrapSendButton(sendButton) {
    wrapperDiv = document.createElement('div');
    addFolderBtn = document.createElement('div');
    console.log('***Adding wrapper div to ' + sendButton);

    wrapperDiv.id = 'zDivAddFolderBtn';
    wrapperDiv.style.marginTop = '-22px';
    wrapperDiv.style.padding = '0px';
    wrapperDiv.style.border = 'none';
    wrapperDiv.style.width = "170px"

    addFolderBtn.id="zAddFolderBtn";
    addFolderBtn.style.display = "inline"
    addFolderBtn.style.color = "white";
    addFolderBtn.style.height = "18px";
    addFolderBtn.style.fontSize = "12px"
    addFolderBtn.style.minWidth = "54px"
    addFolderBtn.style.padding = "7px 8px";
    addFolderBtn.style.background = "#4d90fe";
    addFolderBtn.style.marginLeft = "5px";
    addFolderBtn.innerHTML = "Add File Here";
    //sendButton.style.marginTop = '-15px';

    //sendButton.innerHTML = 'Send <img style=\'width:15px;\' src=\'https://lh3.googleusercontent.com/4OaRE_xbHQe4fWaRBflJEITLTc9LZddS49aDwLtAPAY4TA0-Ikk34OU1wBcTd6Q7FM46ku6a=s26-h26-e365-rw\'/>';

    wrapperDiv.innerHTML = sendButton.outerHTML;
    sendButton.parentElement.appendChild(wrapperDiv);
    wrapperDiv.appendChild(addFolderBtn);
    sendButton.remove();
    
    wrapperDiv.addEventListener('click', _sendButtonClickHandler);
}

function setSendButtonClickHandler(sendButtonClickHandler) {
    _sendButtonClickHandler = sendButtonClickHandler;
}

