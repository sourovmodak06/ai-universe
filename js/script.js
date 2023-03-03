/* ------ load Api ------ */
const loadApiData = async (dataLimit) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/ai/tools`
    );
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
  } catch (error) {
    alert(error);
  }
};

/* ------ display Data ------ */
const displayData = (hubData, dataLimit) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";
  const seeMore = document.getElementById("see-more");
  if (dataLimit && hubData.length > 6) {
    hubData = hubData.slice(0, 6);
    seeMore.classList.remove("hidden");
  } else {
    seeMore.classList.add("hidden");
  }

  hubData.forEach((element) => {
    const cardData = document.createElement("div");
    cardData.innerHTML = `
    <div class="card w-96 glass">
        <figure><img class="h-48 w-full p-2 rounded-2xl" src="${
          element.image
        }" alt="Card Images"/></figure>
        <div class="card-body">
            <h2 class="card-title">Features</h2>
            <ol class="list-decimal ml-5">
                <li>${
                  element.features[0] ? element.features[0] : "No data Found"
                }</li>
                <li>${
                  element.features[1] ? element.features[1] : "No data Found"
                }</li>
                <li>${
                  element.features[2] ? element.features[2] : "No data Found"
                }</li>
            </ol>
            <hr>
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="card-title my-2">${element.name}</h2>
                    <div class="text-gray-400">
                        <span><i class="fa fa-calendar"></i></span> ${
                          element.published_in
                        }
                    </div>
                </div>
                <label for="detailsMore" class="bg-red-50 hover:bg-red-300 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center" onclick="detailsApi(${element.id})">
                    <i class="fa fa-arrow-right"></i>
                </label>
            </div>
        </div>
    </div>
    `;
    cardContainer.appendChild(cardData);
  });
  // /* ------ Display Sort By Date ------ */
  //     document.getElementById('sort-by-date').addEventListener('click', () => {
  //         hubData.sort((x,y) => {
  //             x = new Date(x.published_in).valueOf();
  //             y = new Date(y.published_in).valueOf();
  //             if (x > y) {
  //                 return 1;
  //             }
  //             else if(x < y){
  //                 return -1;
  //             }
  //             else {
  //                 return 0;
  //             }
  //         })
  //     });
};

/* ------ Display See More Data ------ */
document.getElementById("btn-see-more").addEventListener("click", () => {
  loadApiData();
});

/* ------ Display Details Load Api ------ */
const detailsApi = async (elementId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/ai/tool/${elementId <= 9 ? ('0' + elementId) : ('' + elementId)}`
    );
    const data = await res.json();
    modalDetails(data);
  } 
  catch (error) {
    console.log(error); 
  }
};

/* ------ Display Details Data ------ */
const modalDetails = (modalCardDetails) =>{
  document.getElementById('details-card').innerText = modalCardDetails.data.description;
  /* ------ features details ------ */
  const featuresDetailsList = document.getElementById('features-details');
  featuresDetailsList.innerText = '';
  const featuresDetailsListItems = document.createElement('ul');
  featuresDetailsListItems.classList.add('list-disc');
  featuresDetailsListItems.innerHTML =`
    <li>${modalCardDetails.data.features[1].feature_name ? modalCardDetails.data.features[1].feature_name : 'No data Found'}</li>
    <li>${modalCardDetails.data.features[2].feature_name ? modalCardDetails.data.features[2].feature_name : 'No data Found'}</li>
    <li>${modalCardDetails.data.features[3].feature_name ? modalCardDetails.data.features[3].feature_name : 'No data Found'}</li>
  `;
  featuresDetailsList.appendChild(featuresDetailsListItems);


  /* ------ integrations details ------ */
  const integrationsDetailsList = document.getElementById('integrations-details');
  integrationsDetailsList.innerText ='';
  const integrationsDetailsListItems = document.createElement('ul');
  integrationsDetailsListItems.classList.add('list-disc');
  integrationsDetailsListItems.innerHTML = `
    <li>${modalCardDetails.data.integrations[0] ? modalCardDetails.data.integrations[0] : 'No data Found'}</li>
    <li>${modalCardDetails.data.integrations[1] ? modalCardDetails.data.integrations[1] : 'No data Found'}</li>
    <li>${modalCardDetails.data.integrations[2] ? modalCardDetails.data.integrations[2] : 'No data Found'}</li>
    <li>${modalCardDetails.data.integrations[3] ? modalCardDetails.data.integrations[3] : 'No data Found'}</li>
  `;
  integrationsDetailsList.appendChild(integrationsDetailsListItems);


  document.getElementById('details-img').src = modalCardDetails.data.image_link[0];
  document.getElementById('details-card-input').innerText = modalCardDetails.data.input_output_examples[0].input;
  document.getElementById('details-card-output').innerText = modalCardDetails.data.input_output_examples[0].output;
} 


loadApiData(6);

/*

*/
