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

// Funzione per gestire il clic del pulsante "Mi Piace"
function handleLikeButtonClick(event) {
  const postId = event.currentTarget.getAttribute("data-post-id");

  // Verifichiamo se al post è già stato messo il "mi piace"
  if (!likedPosts.includes(postId)) {

    // Aggiungiamo l'ID del post agli ID dei post "mi piace"
    likedPosts.push(postId); 
    const likesCountElement = event.currentTarget.parentNode.querySelector(".fw-bold");
    const likesCount = parseInt(likesCountElement.textContent);

    // Incrementiamo il contatore dei like
    likesCountElement.textContent = likesCount + 1; 

    // Cambiamo lo stile del pulsante per indicare che è stato cliccato il "mi piace"
    event.currentTarget.classList.add("liked");
  }
}

// creiamo un elemento html dove appendere ogni post
const postsContainer = document.getElementById("posts");

// facciamo un ciclo "forEach" per ciclare ogni elemento dell'array
posts.forEach(post => {
  const postElement = document.createElement("div");
  postElement.classList.add("author");

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
                        <h3 class="fs-6">${post.created}</h3>
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

   // Aggiungiamo un gestore di eventi al pulsante "Mi Piace" di ciascun post
   const likeButton = postElement.querySelector(".like-button");
   likeButton.addEventListener("click", handleLikeButtonClick);
});




