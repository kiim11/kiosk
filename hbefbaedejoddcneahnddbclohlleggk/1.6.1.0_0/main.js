chrome.runtime.requestUpdateCheck(updateCheck);
chrome.runtime.onUpdateAvailable.addListener(update);

function updateCheck(status){
    if(status!="update_available")
        return;
    update();
}

function update(){
    chrome.runtime.reload();
}

chrome.app.runtime.onLaunched.addListener(
    function() {
        var screenWidth =  screen.width;
        var screenHeight = screen.height;
        var width = 500;
        var height = 500;
        
        chrome.app.window.create(
            'index.html', 
            {
                bounds: {
                    width: screenWidth,
                    height: screenHeight,
                    left: 0,
                    top: 0
                },
                state       : 'fullscreen',
                frame       : 'none'
            }
        );
    }
);
