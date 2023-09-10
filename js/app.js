let clickedId = '1000';
const handleCategoryTab = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    pushCategoriesToTab(categories)
}

const pushCategoriesToTab = (categories) => {
    const categoryTabContainer = document.getElementById('category-tab-container');
    categories.forEach(category => {
        const a = document.createElement('a');
        a.innerText = category.category;
        a.classList = 'tab bg-gray-200 font-medium text-black text-base rounded-sm';
        a.setAttribute(`onclick`, `showCategories('${category.category_id}'), addActiveClass(event)`);
        categoryTabContainer.appendChild(a);
    });
    categoryTabContainer.querySelector('.tab').classList.add('active');
}

const SecToHourMin = (sec) => {
    if (!sec) {
        return false;
    }
    let min = sec / 60;
    let hour = Math.floor(min / 60);
    min = Math.floor(min - (hour * 60));
    return `${hour}hrs ${min}min ago`;
}

const showCategories = async (id = '1000') => {
    clickedId = id;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const category = data.data;

    const showCategoriesContainer = document.getElementById('show-categories-container');
    const noContentContainer = document.getElementById('no-content-container');
    showCategoriesContainer.innerHTML = '';
    noContentContainer.innerHTML = '';

    if (category.length === 0) {
        noContentContainer.innerHTML = `
            <div class="text-center mt-10">
                <img class="w-24 inline-block" src="./img/Icon.png" alt="No Content found">
                <h1 class="text-3xl font-bold py-7 text-black">Oops!! Sorry, There is no <br> content here</h1>
            </div>
        `;
        return
    }

    category.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow shadow-gray-200">
                <figure class="flex-col relative">
                    <img class="h-52 w-full" src="${element.thumbnail}" alt="" />
                    ${SecToHourMin(element.others.posted_date) ? `<div class="badge badge-secondary absolute bottom-4 right-4 rounded-md bg-black border-0 text-white"> ${SecToHourMin(element.others.posted_date)} </div>` : ''}
                </figure>
                <div class="px-1 py-3 flex gap-3">
                    <div>
                        <img class="w-12 h-12 rounded-full" src="${element.authors[0].profile_picture}" alt="">
                    </div>
                    <div>
                        <h2 class="card-title text-base font-bold"> ${element.title} </h2>
                        <p class="py-2"> <span> ${element.authors[0].profile_name} ${element.authors[0].verified ? `</span> <img class="inline" src="./img/verify.png" alt="verify">` : ``} </p>
                        <p class="text-sm">${element.others.views} views</p>
                    </div>
                </div>
            </div>
        `;
        div.classList = 'card bg-base-100 shadow shadow-gray-200';
        showCategoriesContainer.appendChild(div);
    });
}

const sortByView = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${clickedId}`);
    const data = await res.json();
    const category = data.data;

    category.forEach(element => {
        const sortedData = category.sort(function (a, b) {
            return parseInt(b.others.views) - parseInt(a.others.views);
        })

        const showCategoriesContainer = document.getElementById('show-categories-container');
        const noContentContainer = document.getElementById('no-content-container');
        showCategoriesContainer.innerHTML = '';
        noContentContainer.innerHTML = '';

        if (category.length === 0) {
            noContentContainer.innerHTML = `
            <div class="text-center mt-10">
                <img class="w-24 inline-block" src="./img/Icon.png" alt="No Content found">
                <h1 class="text-3xl font-bold py-7 text-black">Oops!! Sorry, There is no <br> content here</h1>
            </div>
        `;
            return
        }

        sortedData.forEach(element => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card bg-base-100 shadow shadow-gray-200">
                    <figure class="flex-col relative">
                        <img class="h-52 w-full" src="${element.thumbnail}" alt="" />
                        ${SecToHourMin(element.others.posted_date) ? `<div class="badge badge-secondary absolute bottom-4 right-4 rounded-md bg-black border-0 text-white"> ${SecToHourMin(element.others.posted_date)} </div>` : ''}
                    </figure>
                    <div class="px-1 py-3 flex gap-3">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${element.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title text-base font-bold"> ${element.title} </h2>
                            <p class="py-2"> <span> ${element.authors[0].profile_name} ${element.authors[0].verified ? `</span> <img class="inline" src="./img/verify.png" alt="verify">` : ``} </p>
                            <p class="text-sm">${element.others.views} views</p>
                        </div>
                    </div>
                </div>
            `;
            div.classList = 'card bg-base-100 shadow shadow-gray-200';
            showCategoriesContainer.appendChild(div);

        })

    });

}

const addActiveClass = (event) => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    })
    event.target.classList.add('active');
}

handleCategoryTab();
showCategories();

