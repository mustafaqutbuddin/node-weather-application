

const weatherApiWithAddress = (address, callback) => {

    fetch(`http://localhost:3000/weather?address=${address}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    callback(data.error, undefined)
                    return
                }

                callback(undefined, data)
            })
        })

}



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(search.value)

    weatherApiWithAddress(search.value, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        messageOne.textContent = `It is currently ${data.forecast} degrees in ${data.address}`
        messageTwo.textContent = `It has ${data.rainChance}% chances of rain.`
    })
})

