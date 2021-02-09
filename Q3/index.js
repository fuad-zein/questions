var inventory = [
  {
    "inventory_id": 9382,
    "name": "Brown Chair",
    "type": "furniture",
    "tags": [
      "chair",
      "furniture",
      "brown"
    ],
    "purchased_at": 1579190471,
    "placement": {
      "room_id": 3,
      "name": "Meeting Room"
    }
  },
  {
    "inventory_id": 9380,
    "name": "Big Desk",
    "type": "furniture",
    "tags": [
      "desk",
      "furniture",
      "brown"
    ],
    "purchased_at": 1579190642,
    "placement": {
      "room_id": 3,
      "name": "Meeting Room"
    }
  },
  {
    "inventory_id": 2932,
    "name": "LG Monitor 50 inch",
    "type": "electronic",
    "tags": [
      "monitor"
    ],
    "purchased_at": 1579017842,
    "placement": {
      "room_id": 3,
      "name": "Lavender"
    }
  },
  {
    "inventory_id": 232,
    "name": "Sharp Pendingin Ruangan 2PK",
    "type": "electronic",
    "tags": [
      "ac"
    ],
    "purchased_at": 1578931442,
    "placement": {
      "room_id": 5,
      "name": "Dhanapala"
    }
  },
  {
    "inventory_id": 9382,
    "name": "Alat Makan",
    "type": "tableware",
    "tags": [
      "spoon",
      "fork",
      "tableware"
    ],
    "purchased_at": 1578672242,
    "placement": {
      "room_id": 10,
      "name": "Rajawali"
    }
  }
];

const question1 = (data) => {
  let items = [];
  let title = 'Items in the meeting room';
  data.map((item, i) => {
    if (item.placement.name.toLowerCase() == 'meeting room') {
      items.push(item.name)
    }
  })
  return [items, title];
}

const question2 = (data) => {
  let items = [];
  let title = 'All electronic items';
  data.map((item, i) => {
    if (item.type.toLowerCase() == 'electronic') {
      items.push(item.name);
    }
  })
  return [items, title];
}

const question3 = (data) => {
  let items = [];
  let title = 'Find all furnitures';
  data.map((item, i) => {
    if (item.type.toLowerCase() == 'furniture') {
      items.push(item.name);
    }
  })
  return [items, title];
}

const question4 = (data) => {
  let items = [];
  let title = 'Item purchased on 16 januari 2020';
  data.map((item, i) => {
    if (new Date(item.purchased_at * 1000).toString().substr(5, 10)
      == new Date('2020/01/16').toString().substr(5, 10)) {
      items.push(item.name);
    }
  })
  return [items, title];
}


const question5 = (data) => {
  let items = [];
  let title = 'Find all items with brown tag';
  data.map((item, i) => {
    var tags = item.tags;
    if (tags.includes('brown')) {
      items.push(item.name)
    }
  })
  return [items, title];
}

const isEmpty = (arr) => {
  var isEmpty = arr.length < 1 ? true : false;
  return isEmpty;
}

const lihatHasil = (id) => {
  if (id == 'q1') {
    let data = question1(inventory);
    let items = '';
    let title = data[1];
    isEmpty(data[0]) ? items = "Tidak ada data!" :
      data[0].map((item, i) => {
        let value = item;
        items = items + (i + 1) + '. ' + value + '\n';
      })
    $("#modalTitle").text(title)
    $("#modalBody").text(items);
    $("#exampleModalLong").modal()
  }
  else if (id == 'q2') {
    let data = question2(inventory);
    let items = '';
    let title = data[1];
    isEmpty(data[0]) ? items = "Tidak ada data!" :
      data[0].map((item, i) => {
        let value = item;
        items = items + (i + 1) + '. ' + value + '\n';
      })
    $("#modalTitle").text(title)
    $("#modalBody").text(items);
    $("#exampleModalLong").modal()
  }
  else if (id == 'q3') {
    let data = question3(inventory);
    let items = '';
    let title = data[1];
    isEmpty(data[0]) ? items = "Tidak ada data!" :
      data[0].map((item, i) => {
        let value = item;
        items = items + (i + 1) + '. ' + value + '\n';
      })
    $("#modalTitle").text(title)
    $("#modalBody").text(items);
    $("#exampleModalLong").modal()
  }
  else if (id == 'q4') {
    let data = question4(inventory);
    let items = '';
    let title = data[1];
    isEmpty(data[0]) ? items = "Tidak ada data!" :
      data[0].map((item, i) => {
        let value = item;
        items = items + (i + 1) + '. ' + value + '\n';
      })
    $("#modalTitle").text(title)
    $("#modalBody").text(items);
    $("#exampleModalLong").modal()
  }
  else if (id == 'q5') {
    let data = question5(inventory);
    let items = '';
    let title = data[1];
    isEmpty(data[0]) ? items = "Tidak ada data!" :
      data[0].map((item, i) => {
        let value = item;
        items = items + (i + 1) + '. ' + value + '\n';
      })
    $("#modalTitle").text(title)
    $("#modalBody").text(items);
    $("#exampleModalLong").modal()
  }
}
const onImgClick = (id) => {
  console.log(id);
  $("#modalBodyimg").attr('src', id);
  $("#exampleModalImg").modal()
}


