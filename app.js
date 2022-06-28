 if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('magica.js').then(function(){
        console.log('Tem Service Worker! :)');
    }, function(err){
        console.log('Deu ruim! :(', err);
    });
} else {
    console.error('Usa um browser melhor. :)');
}