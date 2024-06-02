const maxCount = 11;
let curPlayerCount = 0;

// player er data load korchi...
const loadData = () => {
    const inputValue = document.getElementById("inputName").value;

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data); 

            if (data.player) {
                getAllPlayer(data.player);
            } else {
                document.getElementById("AlPlayers").innerHTML = "<h2>Sorry! Player not found..Search for another player</h2>";
                document.getElementById("inputName").value = "";
            }
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            document.getElementById("AlPlayers").innerHTML = "<h2>Error fetching the data. Please try again later.</h2>";
        });
}

// player er data gula pawa jabe...
const getAllPlayer = (data) => {
    const AlPlayers = document.getElementById("AlPlayers");
    AlPlayers.innerHTML = "";

    data.forEach(element => {
        // console.log('Player Object:', element); 

        let playerDiv = document.createElement("div");
        playerDiv.className = "playerdiv";
        let playerInfo = `
            <div class="card " style="width: 18rem;">
                <img src="${element.strThumb}" class="card-img-top" alt="${element.strPlayer}">
                <div class="card-body cardcolor">
                    
                    <h5 class="card-title">${element.strPlayer}</h5>
                    
                    <h6> PlayerID : ${element.idPlayer}</h6>
                    <h6> TeamID   : ${element.idTeam}</h6>
                    <h6> Gender   : ${element.strGender}</h6>
                    <h6> Nationality : ${element.strNationality}</h6>
                    
                    <div class="social-media-links d-flex gap-5 p-2">
                        ${element.strTwitter ? `<a href="https://twitter.com/${element.strTwitter}" target="_blank"><img src="./images/logo-instagram 1.png" alt="Twitter" class="social-icon"></a>` : ''}
                        ${element.strInstagram ? `<a href="https://instagram.com/${element.strInstagram}" target="_blank"><img src="./images/logo-twitter 2.png" alt="Instagram" class="social-icon"></a>` : ''}
                    </div>

                    <div class="d-flex justify-content-between">
                        <a href="javascript:void(0)" class="btn btn-secondary mt-2" onclick = "details('${element.idPlayer}')">View Details</a>
                        <a href="javascript:void(0)" class="btn btn-primary mt-2" onclick="handleAddToCart('${element.strPlayer}','${element.idPlayer}')">Add Group</a>
                    </div>
                </div>
            </div>
        `;
        playerDiv.innerHTML = playerInfo;
        AlPlayers.appendChild(playerDiv);
    });

    document.getElementById("inputName").value = "";
}

document.getElementById("button").addEventListener("click", loadData);

// add to card handle korchi...
const handleAddToCart = (name, id) => {

    if(curPlayerCount>=maxCount){
        alert("SORRY! YOU CAN'T ADD PLAYER, YOUR PLAYER IS FULL...")
        return;
    }

    curPlayerCount +=1;

    const cardCount = document.getElementById("count").innerText;
    let convertCount = parseInt(cardCount);
    convertCount += 1;
    document.getElementById("count").innerText = convertCount;
    // console.log(name, price);

    const container = document.getElementById("card-main-container");

    const div = document.createElement("div");
    div.classList.add("card-info");
    div.innerHTML = `
        <h6>${name}</h6>
        <h6 class="price">${id}</h6>
    `;
    container.appendChild(div);
    
};

// player details function....

const details = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0];
            console.log(player);
            const detailContainer = document.getElementById("playerDetailsBody");
            detailContainer.innerHTML = `
                <div class="card">
                    <img src="${player.strThumb}" class="card-img-top w-50" alt="${player.strPlayer}">
                    <div class="card-body">
                        <h5 class="card-title">${player.strPlayer}</h5>
                        <p class="card-text">Sports : ${player.strSport}</p>
                        <p class="card-text">Height : ${player.strHeight}</p>
                        <p class="card-text">Weight : ${player.strWeight}</p>
                        <p class="card-text">Status : ${player.strStatus}</p>
                        <p class="card-text">Date-Of-Birth : ${player.dateBorn}</p>
                        <p class="card-text">Description : ${player.strDescriptionEN.slice(0,100)}</p>
                        <div class="social-media-links d-flex gap-5 p-2">
                            ${player.strTwitter ? `<a href="https://twitter.com/${player.strTwitter}" target="_blank"><img src="./images/logo-instagram 1.png" alt="Twitter" class="social-icon"></a>` : ''}
                            ${player.strInstagram ? `<a href="https://instagram.com/${player.strInstagram}" target="_blank"><img src="./images/logo-twitter 2.png" alt="Instagram" class="social-icon"></a>` : ''}
                        </div>
                </div>
            `;

            // Show the modal
            const modal = new bootstrap.Modal(document.getElementById('playerModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error fetching player details:', error);
        });
};


loadData();



