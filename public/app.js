const lat = document.querySelector('[data-latitude]')
const long = document.querySelector('[data-longitude]')
const btn = document.querySelector('[data-button]')


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        lat.textContent = latitude
        long.textContent = longitude
        
        const data = {latitude, longitude}
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        async function storeToDb() {
            const response = await fetch('/api', options)
            const longlat = await response.json()
            console.log(longlat)
            console.log('sent to server')
        }

        btn.addEventListener('click', storeToDb)
    })
} else {
    console.log('No location')
}

storeToDb();