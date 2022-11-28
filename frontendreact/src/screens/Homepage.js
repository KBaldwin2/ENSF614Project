import Movielist from '../components/Movielist';

//TODO: Fetch allMovies
const dummyMovieData = [
    {
        id: '1',
        title: "Dark Phoenix",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/darkphoenix_lob_crd_01_0.jpg",
        description: "There is lightning",
    }, 
    {
        id: '2',
        title: "Spiderman",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/spider-manhomecoming_lob_crd_01_4.jpg",
        description: "boy is a spider",
        Rating: "3"
    },
    {
        id: '3',
        title: "AntMan",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/antmanandthewaspquantumania_lob_crd_02.jpg",
        description: "Antman",
        Rating: "3"
    },
    {
        id: '4',
        title: "Thor",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/thorloveandthunder_lob_crd_04.jpg",
        description: "Chris hemsworth doing hot guy stuff",
        Rating: "3"
    }, 
    {
        id: '5',
        title: "Captain Marvel",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/captainmarvel_lob_crd_06.jpg",
        description: "Captain marvel doing things",
        Rating: "3"
    },
    {
        id: '6',
        title: "Deadpool",
        image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/deadpool_lob_crd_02.jpg",
        description: "Ryan reynolds doing hot boy stuff",
        Rating: "3"
    }
    
]

function Homepage() {
    return (
        <section>
           
            <h1>In Theaters Now </h1>
            <Movielist movies={dummyMovieData} />

        </section>
    );
}
export default Homepage;