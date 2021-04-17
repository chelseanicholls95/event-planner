// these will not be needed if we have the array of objects from index.html in local storage
const mockObject = {
  venueId: "55e208b8498e8745284c3f82",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockObjectTwo = {
  venueId: "55e208b8498e8745284c3f83",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

const mockObjectThree = {
  venueId: "55e208b8498e8745284c3f81",
  venueName: "Starbucks",
  venueType: "Coffee Shop",
};

// this, ultimately, should be the array in local storage we retrieve from the main index.html
const mockArray = [mockObject, mockObjectTwo, mockObjectThree];

// this function will retrieve whatever data is in local storage
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("favorites"));
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

// this will target the button and remove the object from local storage
const onRemoveFromFavorites = function (event) {
  const target = $(event.target);
  // const currentTarget = $(event.currentTarget);
  if (target.is(`button[name="remove-btn"]`)) {
    const venueId = target.data("venue");
    const favorites = getFromLocalStorage();

    const callback = (each) => {
      if (venueId !== each.venueId) {
        return true;
      } else {
        return false;
      }
    };

    const filteredFavorites = mockArray.filter(callback);
    console.log(filteredFavorites);
  }
};

// this will generate the card based on objects in local storage. Utlimately, it should contain data from the object.
const appendWishlistCard = (mockArray) => {
  const appendCard = (item) => {
    const wishlistCard = `<div class="col m12 l10 offset-l1" >
    <div class="card-panel grey lighten-5 z-depth-1">
      <div class="row valign-wrapper">
        <div class="col l1 m12">Date</div>
        <div class="col l2 m12">
          <img
            src="https://images.unsplash.com/photo-1577997352779-c4db787d35c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80"
            alt=""
            class="circle"
            width="80px" 
            height="auto"
          />
          <!-- notice the "circle" class -->
        </div>
        <div class="col l2 m12">
          <span class="black-text">
Venue Name Here
          </span>
        </div>
        <div class="col l5 m12 offset-m1">comments</div>
        <div class="col l2 m12">
          <button class="btn remove-button" name="remove-btn" data-venue="${item.venueId}">Remove</button>
        </div>
      </div>
    </div>
  </div>`;

    $("#wishlist-card-container").append(wishlistCard);
  };

  // this is going to append a card to the card container, for every object in local storage
  mockArray.forEach(appendCard);
};

//take the favorites as an array or go an re fetch the favorites from local storage
//update favorites array without the favorite that we are deleting
//reset favorites in storage

const onReady = () => {
  //this sets the mock array in local storage
  const favorites = JSON.stringify(mockArray);
  localStorage.setItem("favorites", favorites);

  //this generates a card for every object inside the array
  appendWishlistCard(mockArray);
};

$("#wishlist-card-container").on("click", onRemoveFromFavorites);

$(document).ready(onReady);
