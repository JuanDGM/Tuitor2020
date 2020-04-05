
function actualizaCacheDinamico(requestName,cacheName,response){
    
    caches.open(cacheName).then(cache=>{
                   cache.put(requestName, response);
               });
             return response.clone();
    
    
    
}