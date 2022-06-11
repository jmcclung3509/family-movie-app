const listContainer = document.querySelector(".list-container")
const selectedPersonContainer = document.querySelector(".form-select")
const movieContainer = document.querySelector(".movie-selection")
const ratingContainer = document.getElementById("rangeOutputId")
const movieListContainer = document.querySelector(".movie-container")
const api_url = "https://api.themoviedb.org/3/discover/movie?api_key=6af57a5cf47289dd6788043a2cc7d90d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16%2C%2010751&with_keywords=marvel%2C%20dc%2C%20spiderman%2C%20disney%2C%20comic%2C%20superhero%2C%20pixar%2C%20avengers&with_watch_monetization_types=flatrate"

let date
let starClicked = 0
let rating
let starContainer
let itemsArray = []
let newItemArray = []
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



        let prevDate = localStorage.getItem("date")
        prevDate = prevDate ? prevDate + " |@! " + this.date : this.date
        localStorage.setItem("date", prevDate)
        console.log(prevDate)

        let prevPerson = localStorage.getItem("person")
        prevPerson = prevPerson ? prevPerson + " |@! " + this.person : this.person
        localStorage.setItem("person", prevPerson)
        console.log(prevPerson)

        let prevMovie = localStorage.getItem("movie")
        prevMovie = prevMovie ? prevMovie + " |@! " + this.movie : this.movie
        localStorage.setItem("movie", prevMovie)
        console.log(prevMovie)

        let prevRating = localStorage.getItem("rating")
        prevRating = prevRating ? prevRating + " |@! " + this.rating : this.rating
        localStorage.setItem("rating", prevRating)
        console.log(prevRating)

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

        let ratingElem = document.createElement("p")
        ratingElem.innerHTML = `${this.rating}`
        ratingElem.classList.add('col')
        this.newItem.appendChild(ratingElem)


        // let deleteBtn = document.createElement("button")
        // deleteBtn.innerHTML = "X"
        // deleteBtn.onclick = () => {
        //     this.deleteItem()
        // }
        // deleteBtn.classList.add("col-1")
        // this.newItem.appendChild(deleteBtn)


    }
    // deleteItem() {
    //     this.container.removeChild(this.newItem)

    // }

}

let itemArray = []

function add() {

    let rating = ratingContainer.value;
    let selectedPerson = selectedPersonContainer.value
    let selectedMovie = movieContainer.value
    itemArray.push(new ListItem(listContainer, date, selectedPerson, selectedMovie, rating, false))
    clearInput()
}

function clearInput() {
    movieContainer.value = ""
}


// const movieSearch = allMovieData.map((movie) => {


//     if (!newSearchText) {
//         movie.hasMatch = true
//         return movie;
//     } else {
//         let movieTitle = movie.title.toLowerCase()
//         let movieOverview = movie.overview.toLowerCase()

//         const titleMatch = movieTitle.includes(newSearchText)
//         const overviewMatch = movieOverview.includes(newSearchText)
//         const hasMatch = titleMatch || overviewMatch
//         movie.doesMatch
//         movie
//     }
// }
// })
// }

function startApp() {

    let storedDate = localStorage.getItem('date')
    storedDate = storedDate.split(" |@! ")
    storedDate = storedDate.join(" <br><br> ")

    console.log(storedDate)
    // storedDate.map((item) => {
    //     console.log(item)
    //     currentStoredDate.push(item)
    // })
    // for (let i = 0; i < storedDate.length; i++) {
    //     currentStoredDate = storedDate[i];
    //     console.log(currentStoredDate)
    // }


    let storedPerson = localStorage.getItem('person')
    storedPerson = storedPerson.split(" |@! ")
    storedPerson = storedPerson.join(" <br><br> ")

    // storedPerson.map((item) => {
    //     console.log(item)
    //     currentStoredPerson.push(item)
    // })
    // console.log(currentStoredPerson)


    let storedMovie = localStorage.getItem("movie")
    storedMovie = storedMovie.split(" |@! ")
    storedMovie = storedMovie.join(" <br><br> ")

    console.log(storedMovie)
    // storedMovie.map((item) => {
    //     console.log(item)
    //     currentStoredMovie.push(item)

    // })
    // console.log(currentStoredMovie)

    // for (let i = 0; i < storedMovie.length; i++) {
    //     currentStoredMovie = storedMovie[i]
    //     console.log(currentStoredMovie)


    let storedRating = localStorage.getItem("rating")

    storedRating = storedRating.split(" |@! ")
    console.log(storedRating)

    storedRating = storedRating.join(" <br><br> ")




    newItemArray.push(new ListItem(listContainer, storedDate, storedPerson, storedMovie, storedRating, true))
    // newItemArray.push(new ListItem(listContainer, currentStoredDate, currentStoredPerson, currentStoredMovie, currentStoredRating, true))
}



let allMovieData


function getMovies() {
    getMoviesFromAPI(api_url)
}
async function getMoviesFromAPI(url) {

    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    allMovieData = data.results


    showMovieData(allMovieData)


}



function searchText() {

    const searchText = movieContainer.value
    const newSearchText = searchText.toLowerCase()
    movieListContainer.innerHTML = ""
    if (searchText !== "") {
        getMoviesFromAPI("https://api.themoviedb.org/3/search/movie?api_key=6af57a5cf47289dd6788043a2cc7d90d&query=" + `${newSearchText}`)
    } else {
        getMoviesFromAPI(api_url)
    }
}

console.log(allMovieData)

function showMovieData(allMovieData) {
    console.log(allMovieData)
    movieListContainer.innerHTML = ""
    shuffle(allMovieData)

    let movieData = allMovieData.slice(0, 4)
    let uniqueMovies = [...new Set(movieData)]

    uniqueMovies.map((item) => {
        const title = item.title
        const id = item.id
        const overview = item.overview
        const image = item.backdrop_path
        const releaseDate = item.release_date
        const genreArray = item.genre_ids
        let kidFriendly = false
        const genre = genreArray.map((item) => {
            console.log(item)
            if (item === 10751) {
                kidFriendly = true
            }


        })


        // let familyMovies = uniqueMovies.filter()


        if (kidFriendly && image) {
            const newMovie = document.createElement("div")
            movieListContainer.appendChild(newMovie)

            newMovie.classList.add("newMovie")
            // newMovie.classList.add("col")
            const imgDiv = document.createElement("div")
            newMovie.appendChild(imgDiv)
            imgDiv.classList.add("imgDiv")

            const movieImg = document.createElement("img")
            movieImg.src = `https://www.themoviedb.org/t/p/w220_and_h330_face/${image}`
            imgDiv.appendChild(movieImg)
            movieImg.classList.add("movieImg")
            // movieImg.classList.add("col")

            const movieDataContainer = document.createElement("div")
            movieDataContainer.classList.add("movieDataContainer")
            newMovie.appendChild(movieDataContainer)

            const movieTitle = document.createElement("h3")
            movieTitle.innerHTML = `${title}`
            movieDataContainer.appendChild(movieTitle)

            const movieReleaseDate = document.createElement("p")
            movieReleaseDate.innerHTML = `${releaseDate}`
            movieDataContainer.appendChild(movieReleaseDate)
            movieReleaseDate.classList.add("releaseDate")

            // const movie

            const movieOverview = document.createElement("p")
            movieOverview.innerHTML = `${overview}`
            movieDataContainer.appendChild(movieOverview)
        }
    })

}








function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}