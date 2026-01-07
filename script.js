// CONNECT HTML ELEMENTS
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const foodDetails = document.getElementById("foodDetails");


let debounceTimer;

// DATA (WHAT WE SEARCH)
const foodItems = [
  {
    name: "Chicken Biriyani",
    price: 180,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46"
  },
  {
    name: "Chicken Fried Rice",
    price: 160,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b"
  },
  {
    name: "Beef Biriyani",
    price: 200,
    image: "https://images.unsplash.com/photo-1600628422019-47b11f84a2b8"
  },
  {
    name: "Veg Meals",
    price: 120,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
  },
  {
    name: "Paneer Butter Masala",
    price: 190,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
  }
];

// LISTEN WHEN USER TYPES
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    handleSearch();
  }, 300);
});

// MAIN SEARCH FUNCTION
function handleSearch() {
  const query = searchInput.value.toLowerCase();

  // IF INPUT IS EMPTY, CLEAR SUGGESTIONS
  if (!query) {
    suggestionsBox.innerHTML = "";
    return;
  }

  // FIND MATCHING FOOD ITEMS
  const results = foodItems
    .filter(item => item.name.toLowerCase().includes(query))
    .slice(0, 3);

  renderSuggestions(results);
}

// SHOW SUGGESTIONS
function renderSuggestions(items) {
  suggestionsBox.innerHTML = "";

  if (items.length === 0) {
    suggestionsBox.innerHTML = "<div>No results found</div>";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item.name;

    // CLICK TO SELECT FOOD
    div.addEventListener("click", () => {
      showFood(item);
    });

    suggestionsBox.appendChild(div);
  });
}

// SHOW SELECTED FOOD DETAILS
function showFood(item) {
  suggestionsBox.innerHTML = "";
  searchInput.value = item.name;

  foodDetails.innerHTML = `
    <h2>${item.name}</h2>
    <img src="${item.image}" alt="${item.name}">
    <div class="price">₹ ${item.price}</div>
  `;
}
