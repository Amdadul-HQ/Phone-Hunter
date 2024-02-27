const loadPhones = async (search) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  getPhones(data);
};

const getPhones = (data) => {
  const phones = data.data;
  console.log(phones);
  const phonesContainer = getElementById("phones-container");
  phonesContainer.textContent = "";
  console.log(phonesContainer);
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
    <div class="p-5 border rounded-lg">
        <div class="bg-[rgba(13,110,253,0.05)] px-11 py-9 rounded-lg flex justify-center">
            <img src="${phone.image}" alt="">
        </div>
        <div class="space-y-6 mt-5 text-center">
            <h3 class="text-[#403F3F] text-2xl font-bold">${phone.phone_name}</h3>
            <p class="text-[#706F6F] text-lg font-normal">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-[#403F3F] text-2xl font-bold">$999</p>
            <button class="px-6 py-2 bg-[#0D6EFD] rounded-lg text-white text-xl font-bold hover:bg-[#4578c5] transition-[500ms]">Show Details</button>
        </div>
    </div>`;
    phonesContainer.appendChild(phoneDiv);
  });
};

const phoneHandler = () => {
    const searchInput = getElementById('search-inputField');
    const searchText = searchInput.value;
    loadPhones(searchText);
}


