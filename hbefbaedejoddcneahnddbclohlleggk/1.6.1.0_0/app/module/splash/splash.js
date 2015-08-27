(
    function(){
        var moduleName='splash';
        
        function render(el){
            chrome.app.window.current().setAlwaysOnTop(true);
            
            setTimeout(
                function(){
                    document.getElementById('splash').classList.add('clear');
                    setTimeout(
                        function(){
                            document.getElementById('splash').classList.add('hidden');
                        },
                        1000
                    );
                },
                2000
            );
            
            document.querySelector('#version').innerText='v'+chrome.runtime.getManifest().version;
            
            document.addEventListener(
                'keyup',
                handleKeys
            );
            document.addEventListener(
                'keypress',
                handleKeys
            );
            document.addEventListener(
                'keydown',
                handleKeys
            );
            
            setInterval(
                checkFullscreen,
                500
            );
            
            function handleKeys(e){
                checkFullscreen();
                    setTimeout(
                        checkFullscreen,
                        50
                    );
                if(e.keyCode==27 || e.keyCode==91 || e.keyCode==92 || e.keyCode==115){
                    
                    return;
                }
                
                if(!e.ctrlKey || !e.altKey || !e.shiftKey || e.keyCode!=83)
                    return
                //disable returning
                return;
                document.getElementById('kiosk-webview').classList.add('hidden');
                document.getElementById('configure').classList.remove('hidden');
            }
        }
        
        function checkFullscreen(){
          //  if(chrome.app.window.current().focused && !chrome.app.window.current().hidden && chrome.app.window.current().state=="fullscreen")
             //  return;
            chrome.app.window.current().show();
            chrome.app.window.current().focus();
            if(!chrome.app.window.current().isFullscreen()){
                chrome.app.window.current().fullscreen();
            }
        }
        
        exports(moduleName,render);    
    }
)();