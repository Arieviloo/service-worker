'use strict';

var path = '/',
    CACHE_NAME = 'bluesoft-v1';

this.addEventListener('install', function(event) {
    // Instala app, adicionar os arquivos no cache

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                path,
                path + 'nao-disponivel.html',
                path + 'pagina-2.html',
                path + 'index.html',
                path + 'style.css',
                path + 'app.js',
                path + 'burro.jpg'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(caches.match(event.request).then(function(r) {
        response = r;
        if(!response){
            throw "Nao tem no cache";
        }
        caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function() {
        return fetch(event.request).then(function(res){
           return  res.clone();
        }, function(err){
            return caches.match(path + 'nao-disponivel.html');
        });
    }));
});

this.addEventListener('activate', function(event) {
    // App active and working
});