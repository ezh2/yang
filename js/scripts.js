document.addEventListener("DOMContentLoaded", function () {
    const foodData = {
        1: { name: "Sweet Taro", category: "Dessert" },
        2: { name: "Bamboo Salad", category: "Ovo-lacto vegetarian" },
        3: { name: "Bamboo shoot with rib soup", category: "Soup" },
        4: { name: "Bamboo shoot with pork and fresh black fungus", category: "main" },
        5: { name: "Fried tomato eggs", category: "Main" },
        6: { name: "Fried tomato veggies", category: "Main" },
        7: { name: "Stir fried spoon cabbage with ginger", category: "Ovo-lacto vegetarian" },
        8: { name: "Fried carrot with eggs", category: "Main" },
        9: { name: "Loofah clam soup", category: "Soup" },
        10: { name: "Boiled broccoli carrot", category: "Ovo-lacto vegetarian" },
        11: { name: "Garlic Cucumber Salad", category: "Appetizer" },
        12: { name: "Fried celery with dried tofu", category: "Main" },
        13: { name: "Fried zucchini", category: "Ovo-lacto vegetarian" },
        14: { name: "Fried garlic mushrooms", category: "Appetizer" },
        15: { name: "Fried golden mushrooms sliced beef", category: "Main" },
        16: { name: "Chinese Yam with wasabi paste Salad", category: "Ovo-lacto vegetarian" },
        17: { name: "Eggplant Salad", category: "Appetizer" },
        18: { name: "Miso Eggplant", category: "Ovo-lacto vegetarian" },
        19: { name: "Okra Salad with Japanese sesame sauce", category: "Salad" },
        20: { name: "Okra Salad with Tofu Salad", category: "Salad" },
        21: { name: "Fried onion and eggs", category: "Main" },
        22: { name: "Corn and chicken soup", category: "Soup" },
        23: { name: "Potato ,veggie and oxtail soup", category: "Soup" },
        24: { name: "Pumpkin soup", category: "Soup" },
        25: { name: "Fried Pumpkin with sliced ginger", category: "Main" },
        26: { name: "Fried cabbage with beef", category: "Main" },
        27: { name: "Fried cabbage with carrot and egg", category: "Main" },
        28: { name: "Cabbage pancake", category: "Ovo-lacto vegetarian" },
        29: { name: "Shrimp paste water Spinach", category: "Main" },
        30: { name: "Fried Chinese Cabbage", category: "Ovo-lacto vegetarian" },
        31: { name: "Sweet beans with mushroom", category: "Main" },
        32: { name: "Fried Chayote Leaves", category: "Main" },
        33: { name: "White gourd with pork ribs soup", category: "Soup" },
        34: { name: "Spoon cabbage with oyster sauce", category: "Ovo-lacto vegetarian" },
        35: { name: "Fried bell pepper black fungus", category: "Ovo-lacto vegetarian" },
        36: { name: "Lotus root with pork ribs soup", category: "Soup" },
        37: { name: "Boiled sweet potato greens black fungus", category: "Ovo-lacto vegetarian" },
        38: { name: "Fried bean sprouts", category: "Ovo-lacto vegetarian" },
        39: { name: "Lettuce Salad", category: "Salad" },
        40: { name: "Sweet potato pancake", category: "Ovo-lacto vegetarian" },
        41: { name: "Sweet Potato Fries", category: "Dessert" },
        42: { name: "Baked Sweet Potato", category: "Dessert" },
        43: { name: "Pumpkin Pudding", category: "Dessert" },
        44: { name: "Corn with Bean Sprouts Leek Soup", category: "Soup" },
        45: { name: "Lotus Root Soup", category: "Soup" },
        46: { name: "Spanish Pumpkin Omelette", category: "Ovo-lacto Vegetarian" },
        47: { name: "Stewed Salmon with Radish Puree", category: "Main" },
        48: { name: "Roasted Broccoli Skewers with Herb Bread Flour", category: "Appetizer" },
        49: { name: "Taro and Steamed Clams with White Wine", category: "Appetizer" },
        50: { name: "Mapo Yam", category: "Main" },
        51: { name: "Broccoli Fried Rice", category: "Main" },
        52: { name: "Spanish Sweet Pepper with Garlic and Clams", category: "Main" },
        53: { name: "Sautéed Sweet Potatoes with Beef and Cucumber", category: "Appetizer" }
    };

    const categories = [
        "Soup",
        "Ovo-lacto vegetarian",
        "Salad",
        "Appetizer",
        "Main",
        "Dessert"
    ];

    const generateButton = document.getElementById("generateButton");
    const foodListDisplay = document.getElementById("foodList");
    const vegetarianCheckbox = document.getElementById("vegetarianCheckbox");

    vegetarianCheckbox.addEventListener("change", generateFoods);

    generateButton.addEventListener("click", generateFoods);

    // Trigger the generation when the page loads
    generateFoods();

    // Define a function for generating foods
    function generateFoods() {
        // Clear the food list
        foodListDisplay.innerHTML = "";

        // Determine whether the user is vegetarian based on the checkbox state
        const isVegetarian = vegetarianCheckbox.checked;

        // Define the categories based on the user's preference
        const categories = isVegetarian
            ? ["Appetizer", "Salad", "Ovo-lacto vegetarian", "Dessert"]
            : ["Appetizer", "Salad", "Main", "Dessert"];

        // Initialize the selected categories and selected dishes within each category
        const selectedCategories = {};
        const selectedDishes = {};

        // Shuffle the categories to randomize the selection order
        const shuffledCategories = categories;

        // Randomize dishes within each category and keep the categories fixed
        shuffledCategories.forEach((category) => {
            if (!selectedCategories[category]) {
                const foodsInCategory = getFoodsInCategory(foodData, category);
                if (foodsInCategory.length > 0) {
                    const randomIndex = Math.floor(Math.random() * foodsInCategory.length);
                    const selectedFood = foodsInCategory[randomIndex];
                    selectedCategories[category] = true;
                    selectedDishes[category] = selectedFood;
                }
            }
        });

        // Display the selected dishes with the category fixed in front and dish number in brackets
        Object.entries(selectedDishes).forEach(([category, food]) => {
            const foodNumber = Object.keys(foodData).find(key => foodData[key].name === food.name);
            const listItem = document.createElement("li");
            listItem.innerHTML = `<span>${category}:</span> <a class="dish_link" href="./dish_${foodNumber}.html" target="_blank">${food.name} (Dish ${foodNumber})</a>`;
            foodListDisplay.appendChild(listItem);
        });
    }

    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to get all foods in a specific category
    function getFoodsInCategory(foodData, category) {
        return Object.values(foodData).filter(food => food.category === category);
    }
});