//create loadCategories
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//create renderMenu
const renderMenusCard = (loadMenu, myElement) => {
  const cardContainer = document.getElementById("cards");

  // Remove 'active' class from all buttons
  const allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach((button) => button.classList.remove("active"));

  // Select the element by its ID, class, or any other selector
  const element = document.getElementById(`btn-${myElement}`);
  // Add a class (e.g., 'active') to the element
  element.classList.add("active");

  cardContainer.innerHTML = ``;
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${loadMenu}`)
    .then((res) => res.json())
    .then((data) => displayCard(data.data))
    .catch((error) => console.log(error));
};

//Create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    //create a button
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
        
        
        <button id="btn-${
          item.category
        }" onclick="renderMenusCard('${item.category.toLowerCase()}','${
      item.category
    }');showFullPageLoading()" class="flex items-center px-6  py-4 font-medium gap-5 border-2 rounded-md category-btn ">
        <img class="w-14 h-14" src="${item.category_icon}" />
         ${item.category}
        </button>
      `;

    //add button to catagory container
    categoryContainer.append(buttonContainer);
  });
};

//Create loadCard
const loadCard = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayCard(data.pets))
    .catch((error) => console.log(error));
};

let currentDisplayedCards = []; // To store the currently displayed cards

//Create DisplayCard
const displayCard = (cards) => {
  const cardContainer = document.getElementById("cards");

  if (cards.length == 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    
      <img src="assets/error.webp" /> 
      <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
    </div>`;
  } else {
    cardContainer.classList.add("grid");
  }

  // Store the current cards
  currentDisplayedCards = cards;

  cards.forEach((item) => {
    console.log(item);
    //create a button
    const cardDisplay = document.createElement("div");

    console.log(item.petId);

    cardDisplay.innerHTML = `
        
           <div class="border-2 rounded-lg">
  <div class="p-5">
    <figure>
      <img class="rounded-lg" src="${item.image}" alt="Shoes" />
    </figure>
    <h2 class="card-title font-bold pt-4">${item.pet_name}</h2>
    <p>🐶 Breed: ${item.breed || "Not available"}</p>
    <p>🎂 Birth: ${item.date_of_brith || "Not available"}</p>
    <p>🐕 Gender: ${item.gender || "Not available"}</p>
    <p class="pb-4">💲 Price: ${item.price || "Not available"}</p>
    <hr  />
    <div class="card-actions justify-between pt-4">
      <button class="btn" onclick="loadLike(${item.petId})">👍</button>
      <button class="btn border-2 text-[#0E7A81]" onclick="handleAdopt()">Adobt</button>
      <button
        class="btn border-2 text-[#0E7A81]"
        onclick="customModal.showModal();loadDetails(${item.petId})"
      >
        Details
      </button>
    </div>
  </div>
</div>
              
      `;

    //add button to catagory container
    cardContainer.append(cardDisplay);
  });
};

//Create loadDetails
const loadDetails = (id) => {
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
};

//displayDetails
const displayDetails = (item) => {
  const detailsContainer = document.getElementById("details");
  console.log(item);

  detailsContainer.innerHTML = `
        
        
              
        <div class="card-body border-2 rounded-lg">
        <figure>
          <img class="rounded-lg" src="${item.image}" alt="Shoes" />
        </figure>
    
          <h2 class="card-title font-bold pt-4">${item.pet_name}</h2>

           <div class="flex gap-10">
             <div>
          <p>🐶 Breed: ${item.breed || "Not available"}</p>
          <p>🎂 Birth: ${item.date_of_brith || "Not available"}</p>
          <p>🐕 Gender: ${item.gender || "Not available"}</p>
             </div>
             <div>
          <p>💉 Vaccinated status:: ${
            item.vaccinated_status || "Not available"
          }</p>
          <p class="pb-4">💲Price: ${item.price || "Not available"}</p>
            </div>
          </div>
          <hr  /> 
          <div class="">
            <p class="font-bold">Details Information</p>
            <p>${item.pet_details}</p>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
        
      `;
  document.getElementById("customModal").showModal();
  //add button to catagory container
  // detailsContainer.append(detailsDisplay);
  // });
};

//Create loadLike
const loadLike = (id) => {
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => addLike(data.petData))
    .catch((error) => console.log(error));
};

//addLike
const addLike = (item) => {
  const likeContainer = document.getElementById("like");
  console.log(item);
  // cards.forEach((item) => {
  //   console.log(item);
  //   //create a button
  const likeDisplay = document.createElement("div");

  likeDisplay.innerHTML = `
        


        <img class="rounded-lg " src="${item.image}" alt="" />
      `;
  // document.getElementById("customModal").showModal();
  //add button to catagory container
  likeContainer.append(likeDisplay);
  // });
};

// Event listener for the sort button
// document.getElementById("sortButton").addEventListener("click", sortByPrice);

loadCategories();
loadCard();

// Function to sort by price
const sortByPrice = () => {
  const sortedCards = currentDisplayedCards.sort((a, b) => a.price - b.price);
  // Clear the container before displaying sorted cards
  document.getElementById("cards").innerHTML = "";
  displayCard(sortedCards);
};

const handleAdopt = () => {
  const countdownDisplay = document.getElementById("countdownDisplay");
  const confirmMessage = document.getElementById("confirmMessage");
  const modal = document.getElementById("adoptModal");

  // Show the modal
  modal.showModal();

  // Initialize the countdown value
  let countdownValue = 3;
  confirmMessage.innerHTML = ""; // Clear the confirmation message

  // Start countdown
  const countdownInterval = setInterval(() => {
    if (countdownValue > 0) {
      countdownDisplay.innerHTML = countdownValue; // Show the countdown value
      countdownValue--;
    } else {
      clearInterval(countdownInterval); // Stop the countdown
      countdownDisplay.innerHTML = ""; // Clear the countdown display
      confirmMessage.innerHTML =
        "🎉 Congratulation Your Best Friend Adoption is corfirmed 🎉"; // Show confirmation message
    }
  }, 1000); // Countdown interval is 1 second (1000ms)
};

// // Close modal button
// document.getElementById("closeModalBtn").addEventListener("click", () => {
//   document.getElementById("adoptModal").close();
// });

// // Close modal button event listener
// document.getElementById("closeModalBtn").addEventListener("click", () => {
//   const modal = document.getElementById("adoptModal");
//   modal.close(); // Properly closes the modal
// });

function showFullPageLoading() {
  const loadingScreen = document.getElementById("loadingScreen");

  // Show the loading screen
  loadingScreen.classList.remove("hidden");

  // Disable the button to prevent multiple clicks
  const button = document.getElementById("actionButton");
  button.disabled = true;

  // Simulate loading for 2 seconds
  setTimeout(() => {
    // Hide the loading screen
    loadingScreen.classList.add("hidden");

    // Re-enable the button
    button.disabled = false;

    // Perform any additional action here
    console.log("Action completed after loading");
  }, 1000);
}

// Add the event listener to your button
// document
//   .getElementById("actionButton")
//   .addEventListener("click", showFullPageLoading);
