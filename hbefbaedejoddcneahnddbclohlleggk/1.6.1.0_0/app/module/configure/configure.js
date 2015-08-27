(


    function(){
        var moduleName='configure';
        

        function vwclick() {
                var vw = document.getElementById('kiosk');
                vw.setAttribute("src", "https://www.1platforma.ru");
            }

        function onIdleStateChanged(state) {
            if (state === 'idle') {
                    document.getElementById('ss').classList.remove('hidden');
                    document.getElementById('ss').play();
                 } else {
                    document.getElementById('ss').classList.add('hidden');
                    document.getElementById('ss').pause();
                }
            }

        function render(el){
            chrome.storage.sync.get(
                'url',
                kioskURL
            );
            configureKiosk();

        }
        
        function kioskURL(data){
            if(!data.url){
			data.url="https://www.1platforma.ru";
             //   document.getElementById('configure').classList.remove('hidden');
             //   return;
            }
            
            app.data.url=data.url;
            initKiosk();

        }
        
        function initKiosk(){
            chrome.power.requestKeepAwake("display");
            document.getElementById('configure').classList.add('hidden');
            document.getElementById('ss').setAttribute('width',chrome.app.window.current().innerBounds.width);
            document.getElementById('ss').setAttribute('height',chrome.app.window.current().innerBounds.height);
            chrome.idle.onStateChanged.addListener(onIdleStateChanged);
            /*
             * broke by chrome 38 update
             *
             *webview existed in dom :
            
            var webview=document.getElementById('kiosk')
            webview.setAttribute('src',app.data.url);
            
             **/
            
            var webviewContainer=document.getElementById('kiosk-webview');
            webviewContainer.innerHTML='';
            
            var webview=document.createElement('webview');
            webview.id='kiosk';
            webview.name='kiosk-view';
            webview.classList.add('kiosk');
            webview.setAttribute('src',app.data.url);
            webviewContainer.appendChild(webview);
            
            document.getElementById('kioskURL').value=app.data.url;
            
            webview.addEventListener(
                'permissionrequest', 
                function(e) {
                    console.log(e.permission);
                    e.request.allow();
                }
            );
                    
            document.getElementById('home').addEventListener("click", vwclick, false);

            webviewContainer.classList.remove('hidden');

        }
        
        function configureKiosk(){
            document.getElementById('setKioskURL').addEventListener(
                'click',
                function(e){
                    var url=document.getElementById('kioskURL');
                    if(!url.value){
                        url.classList.add('error');
                        return;
                    }
                    app.data.url=url.value;
                    
                    chrome.storage.sync.set(
                        {
                            url : app.data.url
                        },
                        function(){}
                    );
                    
                    initKiosk();

                }
            )
        }


        
        exports(moduleName,render);    
    }

)();