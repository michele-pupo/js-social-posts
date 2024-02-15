/*
Descrizione
  Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post. 
                Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
                id del post, numero progressivo da 1 a n
                nome autore,
                foto autore,
                data in formato americano (mm-gg-yyyy),
                testo del post,
                immagine (non tutti i post devono avere una immagine),
                numero di likes.
                Non è necessario creare date casuali Per le immagini va bene utilizzare 
                qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, 
              stampiamo i post del nostro feed.
Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e 
              incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post 
              ai quali abbiamo messo il like.
BONUS
 - Formattare le date in formato italiano (gg/mm/aaaa)
 - Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene 
   le iniziali dell'utente (es. Luca Formicola > LF).
 - Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato 
   dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
  {
      "id": 1,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/300?image=171",
      "author": {
          "name": "Phil Mangione",
          "image": "https://unsplash.it/300/300?image=15"
      },
      "likes": 80,
      "created": "2021-06-25"
  },
  {
      "id": 2,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=112",
      "author": {
          "name": "Sofia Perlari",
          "image": "https://unsplash.it/300/300?image=10"
      },
      "likes": 120,
      "created": "2021-09-03"
  },
  {
      "id": 3,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=234",
      "author": {
          "name": "Chiara Passaro",
          "image": "https://unsplash.it/300/300?image=20"
      },
      "likes": 78,
      "created": "2021-05-15"
  },
  {
      "id": 4,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=24",
      "author": {
          "name": "Luca Formicola",
          "image": null
      },
      "likes": 56,
      "created": "2021-04-03"
  },
  {
      "id": 5,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=534",
      "author": {
          "name": "Alessandro Sainato",
          "image": "https://unsplash.it/300/300?image=29"
      },
      "likes": 95,
      "created": "2021-03-05"
  }
];

// inizializziamo un array vuoto per tenere traccia dei post con like
const likedPosts = [];
// console.log(likedPosts);

// funzione per gestire il clic del pulsante "mi piace"
function handleLikeButtonClick(event) {
    const postId = event.currentTarget.getAttribute("data-post-id");
  
    // verifichiamo se al post è già stato messo il "mi piace"
    if (!likedPosts.includes(postId)) {
  
      // aggiungiamo l'id del post agli id dei post "mi piace"
      likedPosts.push(postId); 
      const likesCountElement = event.currentTarget.parentNode.querySelector(".fw-bold");
      const likesCount = parseInt(likesCountElement.textContent);
  
      // incrementiamo il contatore dei like
      likesCountElement.textContent = likesCount + 1; 
  
      // cambiamo lo stile del pulsante per indicare che è stato cliccato il "mi piace"
      event.currentTarget.classList.add("liked");

    } else {

      // se il post è già stato cliccato, rimuoviamo l'id dalla lista e decrementiamo il contatore
      const index = likedPosts.indexOf(postId);
      likedPosts.splice(index, 1);
      const likesCountElement = event.currentTarget.parentNode.querySelector(".fw-bold");
      const likesCount = parseInt(likesCountElement.textContent);

      // decrementiamo il contatore dei like
      likesCountElement.textContent = likesCount - 1; 

      // rimuoviamo lo stile del pulsante per indicare che è stato cliccato il "mi piace"
      event.currentTarget.classList.remove("liked");
    }
  }


// funzione per formattare la data nel formato italiano (gg/mm/aaaa)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    // poichè i mesi partono da 0, aggiungiamo 1
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


// creiamo un elemento html dove appendere ogni post
const postsContainer = document.getElementById("posts");

// facciamo un ciclo "forEach" per ciclare ogni elemento dell'array
posts.forEach(post => {
  const postElement = document.createElement("div");
  postElement.classList.add("author");

  // formattiamo la data
  const formattedDate = formatDate(post.created);


  const content = `

    <div class="container-fluid d-flex flex-column align-items-center">
        <div id="post" class="col-8 bg-white p-3 mb-5">
            <div id="author" class="d-flex">
                <div class="d-flex align-items-center">
                    <div id="img-author" class="col-2">
                        <img src="${post.author.image}" alt="">
                    </div>
                    <div id="text-author" class="col-11 ms-3">
                        <h2 class="fw-bold fs-5 mb-0">${post.author.name}</h2>
                        <h3 class="fs-6">${formattedDate}</h3>
                    </div>
                </div>
            </div>
            <div id="post-body" class="mt-3">
                <p>${post.content}</p>
                <div id="img-post" class="col-12">
                    <img src="${post.media}" alt="">
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div id="liks" class="d-flex align-items-center col-8 justify-content-between mt-3">
                    <button class="like-button" data-post-id="${post.id}" href="#"><i class="fa-regular fa-thumbs-up"></i><span class="fw-bolder"> Mi Piace</span></button>
                    <h6>Piace a <span class="fw-bold">${post.likes}</span> persone</h6>
                </div>
            </div>
        </div>
    </div>
  `;

    postElement.innerHTML = content;
    postsContainer.append(postElement);

   
   // aggiungiamo un gestore di eventi al pulsante "mi piacee" di ciascun post
   const likeButton = postElement.querySelector(".like-button");
   likeButton.addEventListener("click", handleLikeButtonClick);
});




