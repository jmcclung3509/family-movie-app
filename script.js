const listContainer = document.querySelector(".list-container")
const selectedPersonContainer = document.querySelector(".form-select")
const movieContainer = document.querySelector(".movie-selection")
// const ratingContainer = document.querySelector(".rating-container")
let numCount = 0;
let date
let starClicked = 0
let rating
let starContainer

class ListItem {
    newItem = ""
    constructor(container, date, person, movie, rating, saved) {
        this.container = container;
        this.date = date
        this.person = person;
        this.movie = movie
        this.rating = rating


        this.addToContainer();

        if (saved == false) {
            this.saveItem()
        }
    }

    saveItem() {
        let prevData = localStorage.getItem("data")
        prevData = prevData ? prevData + " |@! " + this.date + " |@! " + this.person + " |@! " + this.movie + " |@! " + this.rating : this.date + " |@! " + this.person + " |@! " + this.movie + " |@! " + this.rating
        localStorage.setItem("data", prevData)
        console.log(prevData)

        // let prevData = localStorage.getItem("data")
        // prevData = prevData ? prevData + " |@! " + this.movie : this.movie
        // localStorage.setItem("data", prevData)

        // let prevDate = localStorage.getItem("date")
        // prevDate = prevDate ? prevDate + " |@! " + this.date : this.date
        // localStorage.setItem("date", prevDate)

        // let prevPerson = localStorage.getItem("person")
        // prevPerson = prevPerson ? prevPerson + " |@! " + this.person : this.person
        // localStorage.setItem("person", prevPerson)

        // let prevMovie = localStorage.getItem("movie")
        // prevMovie = prevMovie ? prevMovie + " |@! " + this.movie : this.movie
        // localStorage.setItem("movie", prevMovie)

        // let prevRating = localStorage.getItem("rating")
        // prevRating = prevRating ? prevRating + " |@! " + this.rating : this.rating
        // localStorage.setItem("rating", prevRating)

    }

    addToContainer() {
        this.newItem = document.createElement("li")
        this.newItem.setAttribute("class", "row")
        this.container.appendChild(this.newItem)


        let dateElem = document.createElement("p")
        let date = new Date();
        let noTimeDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
        date.setDate(date.getDate())
        dateElem.innerHTML = noTimeDate
        dateElem.classList.add("col")
        this.newItem.appendChild(dateElem)
        this.date = noTimeDate

        let nameElem = document.createElement("p")
        nameElem.innerHTML = `${this.person}`
        nameElem.classList.add("col")
        this.newItem.appendChild(nameElem)


        let movieElem = document.createElement("p")
        movieElem.innerHTML = `${this.movie}`
        movieElem.classList.add("col")
        this.newItem.appendChild(movieElem)

        // let ratingValue = document.createElement("div")
        // ratingValue.innerHTML = `${this.rating} /5`
        // ratingValue.classList.add("col")
        // this.newItem.appendChild(ratingValue)

        starContainer = document.createElement("div")
        starContainer.classList.add("col")
        starContainer.classList.add("starContainer")
        this.newItem.appendChild(starContainer)




        let star1 = document.createElement("input")
        star1.type = "checkbox"
        star1.setAttribute("class", "star-check star1")
        starContainer.appendChild(star1)

        let star2 = document.createElement("input")
        star2.type = "checkbox"
        starContainer.appendChild(star2)
        star2.setAttribute("class", "star-check star2")



        let star3 = document.createElement("input")
        star3.type = "checkbox"
        starContainer.appendChild(star3)
        star3.classList.add("star-check")

        let star4 = document.createElement("input")
        star4.type = "checkbox"
        starContainer.appendChild(star4)
        star4.classList.add("star-check")

        let star5 = document.createElement("input")
        star5.type = "checkbox"
        starContainer.appendChild(star5)
        star5.classList.add("star-check")

        // this.rating = star1 + star2 + star3 + star4 + star5

        star1.onclick = () => {
            if (!star1.checked) {
                console.log("clicked")
                star1.checked = false
                starClicked--
                // rating.innerText = "0/5"
            } else {
                star1.checked = true;
                starClicked++
                // rating.innerHTML = "1/1"
            }
            getRating()

        }


        star2.onclick = () => {
            if (!star2.checked) {
                console.log("clicked")
                star2.checked = false
                starClicked--
            } else if (starClicked < 2) {
                starClicked = 2
                star2.checked = true
                star1.checked = true

            } else {
                star2.checked = true;
                star1.checked = true
                starClicked++
            }
            getRating()

        }


        star3.onclick = () => {
            if (!star3.checked) {
                console.log("clicked")
                star3.checked = false
                starClicked--
            } else if (starClicked < 3) {
                starClicked = 3
                star3.checked = true
                star2.checked = true
                star1.checked = true

            } else {
                star3.checked = true;
                star2.checked = true;
                star1.checked = true
                starClicked++

            }
            getRating()

        }



        star4.onclick = () => {
            if (!star4.checked) {
                star4.checked = false;
                starClicked--
            } else if (starClicked < 4) {
                starClicked = 4
                star4.checked = true
                star3.checked = true
                star2.checked = true
                star1.checked = true

            } else {
                star4.checked = true
                star3.checked = true
                star2.checked = true
                star1.checked = true
                starClicked++
            }
            getRating()
        }


        star5.onclick = () => {
            if (!star5.checked) {
                star5.checked = false;
                starClicked--
            } else if (starClicked < 5) {

                star5.checked = true
                star4.checked = true
                star3.checked = true
                star2.checked = true
                star1.checked = true
                starClicked = 5

            } else {
                star5.checked = true
                star4.checked = true
                star3.checked = true
                star2.checked = true
                star1.checked = true
                starClicked++
            }
            getRating()
        }

        let rating = document.createElement("p")
        starContainer.appendChild(rating)
        rating.classList.add("rating")

        // rating.innerHTML = `${starClicked}/5`


        function getRating() {
            rating.innerHTML = `${starClicked}/5`
        }
        this.rating = `${starClicked}/5`

    }

}
let itemArray = []

function add() {


    let selectedPerson = selectedPersonContainer.value
    let selectedMovie = movieContainer.value
    itemArray.push(new ListItem(listContainer, date, selectedPerson, selectedMovie, rating, false))
    clearInput()


}
function clearInput() {
    movieContainer.value = ""
    starClicked = 0
}
function startApp() {

    let storedData = localStorage.getItem("data")
    console.log(storedData)
    storedData = storedData.split(" |@! ")
    console.log(storedData)
    storedData.forEach((data, index) => {
        console.log(data, index)

    })



    // let storedDate = (localStorage.getItem("date")).split(" |@! ")


    // storedDate.map((date) => {
    //     date = date
    //     console.log(date)
    // })
    // let storedPerson = (localStorage.getItem("person")).split(" |@! ")
    // storedPerson.map(person => {
    //     console.log(person)
    //     person = person
    // })
    // let storedMovie = (localStorage.getItem("movie")).split(" |@! ")
    // storedMovie.map(movie => {
    //     console.log(movie)
    //     movie = movie
    // })
    // let storedRating = (localStorage.getItem("rating")).split(" |@! ")
    // storedRating.map(rating => {
    //     console.log(rating)
    //     rating = rating
    // })


}


