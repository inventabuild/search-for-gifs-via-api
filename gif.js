let gifContainer = document.querySelector('.js-gif-container');
let form = document.querySelector('.js-gif-form');
let repoInput = document.querySelector('[name=gif-name]');

function fetchRepo(repoName) {
    
        fetch(`http://api.giphy.com/v1/gifs/search?q=${repoName}&api_key=${GIPHY_KEY}&limit=20`)
        .then(data => data.json())
        .then(response => {
            console.log(response)
            // erroneous response is not an array, but an object
            if (!Array.isArray(response.data)) { 
                throw 'Erroneous response';
            }
            let html = ""
            let x = 0
            response.data.forEach(element => {
                html += `<iframe src="${response.data[x].embed_url}" class="image-style"></iframe>`
                x++
            });
                gifContainer.innerHTML = html;
        })
        .catch(err => {
            console.warn(err);
            gifContainer.innerHTML = `<p>Error fetching repo ${repoName}</p>`;    
        })
        .catch(err => {
            console.warn(err);
            gifContainer.innerHTML = `<p>Error fetching repo ${repoName}</p>`;    
        })
    
}

//From P5 YouTube tutorial
// function gotData(data){
//     println(data.data[0].images.original.url)
// }

function formSubmitted(event) {
    event.preventDefault();
    let repoName = repoInput.value;
    fetchRepo(repoName);
}

form.addEventListener('submit', formSubmitted);