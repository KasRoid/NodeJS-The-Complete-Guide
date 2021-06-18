const makeCardList = () => {
  const names = [`Song`, `David`];
  const jobs = [`Developer`, `Bad Engineer`];

  names.forEach(function (name, index) {
    const img = document.createElement(`img`);
    img.src = `https://www.vhv.rs/dpng/d/544-5445462_people-icons-png-flat-person-icon-png-transparent.png`;
    img.alt = `Avatar`;
    img.style = `width: 10vw`;
    const h4 = document.createElement(`h4`);
    const b = document.createElement(`b`);
    b.id = `title`;
    const p = document.createElement(`p`);
    p.id = `description`;
    const cardDiv = document.createElement(`div`);
    const infoDiv = document.createElement(`div`);
    infoDiv.className = `info`;
    cardDiv.className = `card`;
    b.innerHTML += name;
    p.innerHTML += jobs[index];
    h4.appendChild(b);
    infoDiv.appendChild(h4);
    infoDiv.appendChild(p);
    cardDiv.appendChild(img);
    cardDiv.appendChild(infoDiv);
    document.getElementById(`cards`).appendChild(cardDiv);
  });
};

makeCardList();
