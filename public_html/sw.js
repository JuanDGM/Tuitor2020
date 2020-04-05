
importScripts('js/sw-utils.js');

const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'INMUTABLE-v1';

const APP_SHEL = [
    'index.html',
    'js/sw-utils.js',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'js/app.js'
];

const APP_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];


self.addEventListener('activate',e=>{
    
    const respuesta = caches.keys().then(keys=>{
        
        keys.forEach(key=>{
            
            if(key!==CACHE_STATIC && key.includes('static')){
                caches.delete(key);
            }
            
        });
        
    });
    
    e.waitUntil(respuesta);
});


self.addEventListener('install', e=>{
    
    const respuesta = caches.open(CACHE_STATIC).then(cache=>{
        cache.addAll(APP_SHEL);
    });
    
    const resIntumatable = caches.open(CACHE_INMUTABLE).then(cache=>{
        cache.addAll(APP_INMUTABLE);
    });
    
    e.waitUntil(Promise.all([respuesta, resIntumatable]));
    
});


self.addEventListener('fetch',e=>{
    
    const respuesta = caches.match(e.request).then(res=>{
        if(res){
            return res;
        }else{
            console.log('error', e.request.url);
        
           return fetch(e.request).then(newRes=>{
               
               actualizaCacheDinamico(e.request,CACHE_DYNAMIC,newRes);  
           });
        }
        
    });
    
    
    e.respondWith( respuesta );
});




