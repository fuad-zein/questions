var profile = [
    {
        "id": 323,
        "username": "rinood30",
        "profile": {
            "full_name": "Shabrina Fauzan",
            "birthday": "1988-10-30",
            "phones": [
                "08133473821",
                "082539163912"
            ]
        },
        "articles:": [
            {
                "id": 3,
                "title": "Tips Berbagi Makanan",
                "published_at": "2019-01-03T16:00:00"
            },
            {
                "id": 7,
                "title": "Cara Membakar Ikan",
                "published_at": "2019-01-07T14:00:00"
            }
        ]
    },
    {
        "id": 201,
        "username": "norisa",
        "profile": {
            "full_name": "Noor Annisa",
            "birthday": "1986-08-14",
            "phones": []
        },
        "articles:": [
            {
                "id": 82,
                "title": "Cara Membuat Kue Kering",
                "published_at": "2019-10-08T11:00:00"
            },
            {
                "id": 91,
                "title": "Cara Membuat Brownies",
                "published_at": "2019-11-11T13:00:00"
            },
            {
                "id": 31,
                "title": "Cara Membuat Brownies",
                "published_at": "2019-11-11T13:00:00"
            }
        ]
    },
    {
        "id": 42,
        "username": "karina",
        "profile": {
            "full_name": "Karina Triandini",
            "birthday": "1986-04-14",
            "phones": [
                "06133929341"
            ]
        },
        "articles:": []
    },
    {
        "id": 201,
        "username": "icha",
        "profile": {
            "full_name": "Annisa Rachmawaty",
            "birthday": "1987-12-30",
            "phones": []
        },
        "articles:": [
            {
                "id": 39,
                "title": "Tips Berbelanja Bulan Tua",
                "published_at": "2019-04-06T07:00:00"
            },
            {
                "id": 43,
                "title": "Cara Memilih Permainan di Steam",
                "published_at": "2019-06-11T05:00:00"
            },
            {
                "id": 58,
                "title": "Cara Membuat Brownies",
                "published_at": "2019-09-12T04:00:00"
            }
        ]
    }
];

const question1 = (data) => {
    let users = [];
    let username = [];
    data.map((item, i) => {
        if (item.profile.phones.length < 1) {
            users.push(item);
            username.push(item.username);
        }
    })
    return [users, username];
}

const question2 = (data) => {
    let users = [];
    let username = [];
    data.map((item, i) => {
        if (item['articles:'].length >= 1) {
            users.push(item);
            username.push(item.username);
        }
        // console.log(item['articles:']);
    })
    return [users, username];
}

const question3 = (data) => {
    let users = [];
    let username = [];
    data.map((item, i) => {
        if (item.profile.full_name.toLowerCase().includes("annis")) {
            users.push(item);
            username.push(item.username);
        }
    })
    return [users, username];
}

const question4 = (data) => {
    let users = [];
    let username = [];
    data.map((item, i) => {
        let isTrue = false;
        item['articles:'].map((article) => {
            if (article.published_at.substr(0, 4) == '2020') {
                if (!isTrue) {
                    users.push(item);
                    username.push(item.username);
                }
                isTrue = true;
            }
        })
    })
    return [users, username];
}

const question5 = (data) => {
    let users = [];
    let username = [];
    data.map((item, i) => {
        if (item.profile.birthday.substr(0, 4) == '1986') {
            users.push(item);
            username.push(item.username);
        }
    })
    return [users, username];
}

const question6 = (data) => {
    let articles = [];
    let title = [];
    data.map((item, i) => {
        item['articles:'].map((article) => {
            if (article.title.toLowerCase().includes('tips')) {
                    articles.push(article);
                    title.push(article.title);
            }
        })
    })
    return [articles, title];
}

const question7 = (data) => {
    let articles = [];
    let title = [];
    data.map((item, i) => {
        item['articles:'].map((article) => {
            if (Date.parse(article.published_at) < Date.parse('2019-08')) {
                    articles.push(article);
                    title.push(article.title);
            }
        })
    })
    return [articles, title];
}

const isEmpty = (arr)=>{
   var isEmpty = arr.length<1?true:false;
   return isEmpty;
}

const lihatHasil = (id)=>{
    if(id=='q1'){
        let data = question1(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q2'){
        let data = question2(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q3'){
        let data = question3(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q4'){
        let data = question4(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q5'){
        let data = question5(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q6'){
        let data = question6(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
    else if(id=='q7'){
        let data = question7(profile);
       
        let profiles = '';
        let usernames = isEmpty(data[1])?"Tidak ada data":JSON.stringify(data[1],null,2);
        isEmpty(data[0])?profiles="Tidak ada data!":
        data[0].map((item,i)=>{
           let value = JSON.stringify(item,undefined,2);
           profiles = profiles+(i+1)+'. '+value+'\n\n';
        })
        $("#modalTitle").text(usernames)
        $("#modalBody").text(profiles);
        $("#exampleModalLong").modal()
    }
}
const onImgClick = (id)=>{
    console.log(id);
    $("#modalBodyimg").attr('src', id);
    $("#exampleModalImg").modal()
}


