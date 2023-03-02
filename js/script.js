/* ------ load Api ------ */
const loadApiData = async () => {

try{
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  displayData(data.data.tools);
} 
catch(error){
    alert(error);
}
  
};

/* ------ display Data ------ */
const displayData = (hubData) => {
  const cardContainer = document.getElementById("card-container");

  hubData.forEach((element) => {
    const cardData = document.createElement("div");
    cardData.innerHTML = `
    <div class="card w-96 glass">
        <figure><img src="https://picsum.photos/200" alt="Card Images"/></figure>
        <div class="card-body">
            <h2 class="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Learn now!</button>
            </div>
        </div>
    </div>
    `;
    cardContainer.appendChild(cardData);
});
};

loadApiData();


/*

*/