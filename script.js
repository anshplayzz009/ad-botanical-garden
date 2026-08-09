function toggleMenu() {
    const nav = document.getElementById("navLinks");

    nav.classList.toggle("show");
}
// =================================
// PLANT CATEGORY FILTER
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    const plantCards = document.querySelectorAll(".plant-card");

    if (!selectedCategory || plantCards.length === 0) {
        return;
    }

    plantCards.forEach(function (card) {

        const category = card.getAttribute("data-category");

        if (category === selectedCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});
// =================================
// PLANT SEARCH
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("plantSearch");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("searchResults");
    const searchTitle = document.getElementById("searchTitle");

    if (!searchInput || !resultsContainer) {
        return;
    }

    const plants = [
        {
            name: "Neem",
            scientific: "Azadirachta indica",
            category: "Medicinal Plant",
            image: "images/plants/neem.jpg",
            link: "plant-neem.html"
        },
        {
            name: "Rose",
            scientific: "Rosa",
            category: "Flowering Plant",
            image: "images/plants/rose.jpg",
            link: "plant-rose.html"
        },
        {
            name: "Sacred Lotus",
            scientific: "Nelumbo nucifera",
            category: "Aquatic Plant",
            image: "images/plants/lotus.jpg",
            link: "plant-lotus.html"
        },
        {
            name: "Hibiscus",
            scientific: "Hibiscus rosa-sinensis",
            category: "Flowering Plant",
            image: "images/plants/hibiscus.jpg",
            link: "plant-hibiscus.html"
        },
        {
            name: "Banyan",
            scientific: "Ficus benghalensis",
            category: "Heritage Tree",
            image: "images/plants/banyan.jpg",
            link: "plant-banyan.html"
        },
        {
            name: "Aloe Vera",
            scientific: "Aloe vera",
            category: "Succulent Plant",
            image: "images/plants/aloe-vera.jpg",
            link: "plant-aloe-vera.html"
        }
    ];


    function performSearch() {

        const query = searchInput.value.trim().toLowerCase();

        resultsContainer.innerHTML = "";

        if (query === "") {

            searchTitle.textContent = "Explore the collection";

            resultsContainer.innerHTML = `
                <div class="search-empty">
                    <span>🌿</span>
                    <p>
                        Start typing a plant name to search
                        the collection.
                    </p>
                </div>
            `;

            return;
        }


        const results = plants.filter(function (plant) {

            return (
                plant.name.toLowerCase().includes(query) ||
                plant.scientific.toLowerCase().includes(query) ||
                plant.category.toLowerCase().includes(query)
            );

        });


        searchTitle.textContent =
            results.length + " plant" +
            (results.length === 1 ? "" : "s") +
            " found";


        if (results.length === 0) {

            resultsContainer.innerHTML = `
                <div class="search-empty">
                    <span>🍃</span>
                    <p>
                        No plants found for
                        "<strong>${query}</strong>".
                    </p>
                </div>
            `;

            return;
        }


        results.forEach(function (plant) {

            const card = document.createElement("a");

            card.href = plant.link;
            card.className = "search-result-card";

            card.innerHTML = `
                <div class="search-result-image">
                    <img
                        src="${plant.image}"
                        alt="${plant.name}"
                    >
                </div>

                <div class="search-result-info">

                    <span class="search-result-category">
                        ${plant.category}
                    </span>

                    <h3>
                        ${plant.name}
                    </h3>

                    <p>
                        <em>${plant.scientific}</em>
                    </p>

                    <span class="search-result-link">
                        Open field note →
                    </span>

                </div>
            `;

            resultsContainer.appendChild(card);

        });

    }


    searchButton.addEventListener(
        "click",
        performSearch
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );


    searchInput.addEventListener(
        "input",
        performSearch
    );

});