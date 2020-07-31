// console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit' , (re) => {
    re.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)

    fetch(url ).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = 'Error'
                messageTwo.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.temperature)
                messageTwo.textContent = data.location
                messageOne.textContent = data.temperature
            }
        })
    })
})