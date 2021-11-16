window.addEventListener('load', () => {
    document.querySelector('.offline-indicator').classList.add('d-none');
    function handleNetworkChange(event) {
        if (navigator.onLine) {
            
        } else {
            document.querySelector('.offline-indicator').classList.remove('d-none');
            document.querySelector('.offline-indicator').classList.add('d-block');
        }
    }
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
})