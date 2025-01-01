const initialCards = [
  {
    name:"Val Thorens",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name:"Restaurant terrace",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name:"An outdoor cafe",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name:"A very long bridge, over the forest and through the trees",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name:"Tunnel with morning light",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name:"Mountain house",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  }
];

const profileEditButton = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__subtitle");

const editModal = document.querySelector("#edit-modal");

const profileFormElement = editModal.querySelector(".modal__form");

const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const editModalNameInput = document.querySelector("#profile-name-input");

const editModalDescriptionInput = document.querySelector("#profile-description-input");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__info");
  const cardImageElement = cardElement.querySelector(".card__photo");


  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;



  return cardElement;
}

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);

editModalCloseBtn.addEventListener("click", closeModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}