const loadPhones = async (search,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  getPhones(data,isShowAll);
};

const getPhones = (data,isShowAll) => {
  let phones = data.data;
  console.log(phones);

  const phonesContainer = getElementById("phones-container");
  phonesContainer.textContent = "";

  const nothingFoundPage = getElementById('nothingFound');
  if (phones.length === 0) {
    nothingFoundPage.classList.remove('hidden');
  }
  else{
    nothingFoundPage.classList.add('hidden');
  }

  const showAllButton = getElementById('showAllButtonContainer');
  if (phones.length > 9 && !isShowAll) {
    showAllButton.classList.remove('hidden');
  }
  else{
    showAllButton.classList.add('hidden');
  }
  
  if(!isShowAll){
    phones = phones.slice(0,9)
  }

  // console.log(phonesContainer);
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
    <div class="p-5 border h-[630px] rounded-lg">
        <div class="bg-[rgba(13,110,253,0.05)] px-11 py-9 rounded-lg flex justify-center">
            <img src="${phone.image}" alt="">
        </div>
        <div class="space-y-6 mt-5 text-center">
            <h3 class="text-[#403F3F] text-2xl font-bold">${phone.phone_name}</h3>
            <p class="text-[#706F6F] text-lg font-normal">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-[#403F3F] text-2xl font-bold">$999</p>
            <button onclick="handleShowDetailsButton('${phone.slug}');my_modal_4.showModal()" class="px-6 py-2 bg-[#0D6EFD] rounded-lg text-white text-xl font-bold hover:bg-[#4578c5] transition-[500ms]">Show Details</button>
        </div>
    </div>`;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleLoadingSpinner(false);
};

const phoneHandler = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchInput = getElementById('search-inputField');
  const searchText = searchInput.value;
  loadPhones(searchText,isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = getElementById('loading-container');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAllButton = () => {
  phoneHandler(true);
}

const handleShowDetailsButton = async (id) => {
  // console.log('click on show details');
  console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
  const phoneDeitlis = getElementById('showPhoneDeitls');
  phoneDeitlis.innerHTML = `<div class="bg-[rgba(13,110,253,0.05)] flex justify-center items-center px-40 py-12 rounded-lg">
   <img src="${data.data.image}" alt="">
   </div>
   <div class="space-y-5">
   <h3 class="text-3xl text-[#403F3F] font-bold">${data.data.name}</h3>
   <p class="text-base text-[#706F6F] font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Storage :</span> ${data.data.mainFeatures.storage}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Display Size :</span>${data.data.mainFeatures.displaySize}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Chipset :</span>${data.data.mainFeatures.chipSet}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Memory :</span>${data.data.mainFeatures.memory}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Slug :</span>${data.data.slug}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Release data :</span>${data.data.releaseDate}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">Brand :</span>${data.data.brand}</p>
   <p><span class="text-xl text-[#403F3F] font-semibold">GPS :</span>${data.data.others.GPS}</p>
     </div>
  <div class="modal-action">
      <form method="dialog">
          <!-- if there is a button, it will close the modal -->
          <button class="btn">Close</button>
      </form>
  </div>`
}