import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0d76b871-5b68-468f-a27d-489840a0b6ed",
    "Content-Type": "application/json",
  },
});

const addModalButton = document.querySelector(".profile__add-button");

const profileEditButton = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//edit form elements
const editModal = document.querySelector("#edit-modal");
const profileFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//card form elements
const addModal = document.querySelector("#add-modal");
const cardForm = addModal.querySelector(".modal__form");
const cardSubmitBtn = addModal.querySelector(".modal__submit-btn");
const addModalLinkInput = addModal.querySelector("#image-link-input");
const addModalCaptionInput = addModal.querySelector("#image-caption-input");

//avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

const addModalCloseBtn = addModal.querySelector(".modal__close-btn");

//delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCancelBtn = deleteModal.querySelector(".modal__submit-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");

//preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaptionElement =
  previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
// const newPost = previewModal.querySelector(".")

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardId;

api
  .getAppInfo()
  .then(([cards, user]) => {
    console.log(cards, user);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
    handleUserInfo(user);
  })
  .catch(console.error);

const handleUserInfo = (user) => {
  console.log(user);
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
};

function handleDeleteCard(cardElement, cardId) {
  console.log(cardId);
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .deleteCard(selectedCardId)
    .then(() => {
      //remove card from dom
      selectedCard.remove();
      //close the modal
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      // helpers
      setButtonText(submitBtn, false);
    });
}

function handleLike(evt, id) {
  // evt.target.classList.toggle("card__like-button_liked");
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_liked");
  // TODO - pass correct arguement to handleLikeStatus
  api
    .handleLikeStatus(id, isLiked)
    .then(() => {
      // TODO - toggle class active
      likeButton.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

function handleImageClick(data) {
  previewModalImageElement.src = data.link;
  previewModalImageElement.alt = data.name;
  previewModalCaptionElement.textContent = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__info");
  const cardImageElement = cardElement.querySelector(".card__photo");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  //TODO - if the card is liked, set the active class on the card
  console.log(data);
  if (data.isLiked) cardLikeBtn.classList.add("card__like-button_liked");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));
  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });
  cardImageElement.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("click", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", handleOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpen = document.querySelector(".modal_opened");
    closeModal(modalOpen);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //helpers
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      // helpers
      setButtonText(submitBtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  //helpers
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  const inputValues = {
    name: addModalCaptionInput.value,
    link: addModalLinkInput.value,
  };

  api
    .postNewCard(inputValues)
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset();
      //
      disableButton(cardSubmitBtn, settings);
      closeModal(addModal);
    })
    .catch(console.error)
    .finally(() => {
      //helpers
      setButtonText(submitBtn, false);
    });
}
//
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatar({ avatar: avatarLinkInput.value })
    .then((data) => {
      console.log(data.avatar);
      profileAvatar.src = avatarLinkInput.value;
      //
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}
//
// function handleLoadCard(evt) {
//   evt.preventDefault();
//   api
//     .postNewCard({
//       link: addModalLinkInput.value,
//       name: addModalCaptionInput.value,
//     })
//     .then((data) => {
//       // add this card to the DOM

//       // and close card
//       // and reset form
//       console.log(data);
//     })
//     .catch(console.error);
// }
// //
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    profileFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
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

deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);
enableValidation(settings);
