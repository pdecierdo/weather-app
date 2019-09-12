const addressInput = document.querySelector('input[type="text"]')
const addressInputForm = document.querySelector('#addressInputForm')
const forecastContent = document.querySelector('#forecastContent')
const loader = document.querySelector('.loading-img')

const fetchForecast = (rawAddress) => {
    addressInput.value = ''
    forecastContent.innerHTML = ''
    loader.classList.remove('hidden')

    const address = encodeURIComponent(rawAddress)
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then(({forecast, location, error} = {}) => {
            if(error){
                const errorText = document.createElement('span')
                errorText.textContent = 'Location was not found.'
                errorText.classList.add('error')
                loader.classList.add('hidden')
                return forecastContent.appendChild(errorText)
            }
            
            const head = document.createElement('h3');
            const forecastText = document.createTextNode(forecast)
            head.textContent = location
            forecastContent.appendChild(head)
            forecastContent.appendChild(forecastText)
            loader.classList.add('hidden')
        })
    })
}

addressInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchForecast(addressInput.value)
})

console.log('Everglow')