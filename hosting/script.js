function fetchDataFromAPI1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API 1:", error);
          resolve(null);
        });
    }, 1000);
  });
}

function fetchDataFromAPI2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API 2:", error);
          resolve(null);
        });
    }, 2000);
  });
}

function fetchDataFromAPI3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API 3:", error);
          resolve(null);
        });
    }, 3000);
  });
}

function displayDataInTable(data) {
  const tableBody = document.getElementById("dataBody");
  const tableHead = document.getElementById("tablehead");
  tableHead.innerHTML = "";
  if (data[0].title) {
    console.log("hi");
    tableHead.innerHTML = `<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
  </tr>`;
  } else {
    tableHead.innerHTML = `<tr>
    <th>ID</th>
    <th>Todo</th>
    <th>User Id</th>
  </tr>`;
  }
  tableBody.innerHTML = "";
  console.log(data);
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title || item.name || item.todo}</td>
        <td>${item.body || item.description || item.userId}</td>
      `;
    tableBody.appendChild(row);
  });
}

document.getElementById("fetchDataBtn").addEventListener("click", () => {
  fetchDataFromAPI1()
    .then((data) => {
      if (data) {
        console.log(data);
        displayDataInTable(data.posts);
        return fetchDataFromAPI2();
      } else {
        return Promise.reject("Error fetching data from API 1");
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        displayDataInTable(data.products);
        return fetchDataFromAPI3();
      } else {
        return Promise.reject("Error fetching data from API 2");
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        displayDataInTable(data.todos);
      } else {
        console.error("Error fetching data from API 3");
      }
    })
    .catch((error) => {
      console.error("Promise chain error:", error);
    });
});
