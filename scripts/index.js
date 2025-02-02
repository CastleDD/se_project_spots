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

const addModalButton = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__subtitle");


const editModal = document.querySelector("#edit-modal");

const profileFormElement = editModal.querySelector(".modal__form");

const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const editModalNameInput = editModal.querySelector("#profile-name-input");

const editModalDescriptionInput = editModal.querySelector("#profile-description-input");


const addModal = document.querySelector("#add-modal");

const cardForm = addModal.querySelector(".modal__form");
const cardSubmitBtn = addModal.querySelector(".modal__submit-btn")
const addModalLinkInput = addModal.querySelector("#image-link-input");
const addModalCaptionInput = addModal.querySelector("#image-caption-input");

const addModalCloseBtn = addModal.querySelector(".modal__close-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaptionElement = previewModal.querySelector(".modal__caption");

const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");



const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__info");
  const cardImageElement = cardElement.querySelector(".card__photo");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");



  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked")
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);


    previewModalCaptionElement.textContent = data.name;
    previewModalImageElement.src = data.link;
    previewModalImageElement.alt = data.name
  });

  return cardElement;
}


function openModal(modal) {
   modal.classList.add("modal_opened");
   document.addEventListener("keydown", closeModalEsc);
   modal.addEventListener("click", handleOverlay);
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", handleOverlay);
};

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpen = document.querySelector(".modal_opened");
    closeModal(modalOpen);
  };
};

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  };
};


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
};

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {name: addModalCaptionInput.value, link: addModalLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(addModal);
};


profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileFormElement, [editModalNameInput, editModalDescriptionInput], settings);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});


addModalButton.addEventListener("click", () => {

  openModal(addModal);
});

addModalCloseBtn.addEventListener("click", () => {
  closeModal(addModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});



profileFormElement.addEventListener("submit", handleProfileFormSubmit);
  cardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
