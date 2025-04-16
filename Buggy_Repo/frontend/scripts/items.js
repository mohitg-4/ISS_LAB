const baseURL = "http://localhost:8000";

async function loadItems(searchTerm = "") {
  const res = await fetch(`${baseURL}/items`);
  const data = await res.json();
  const list = document.getElementById("itemList");
  list.innerHTML = "";

  const filteredItems = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  document.getElementById("itemCount").textContent = `Total items: ${filteredItems.length}`;

  filteredItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.description}`;
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => deleteItem(item._id);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// async function deleteItem(id) {
//   await fetch(`${baseURL}/items/${id}`, { method: "POST" });
//   loadItems(document.getElementById("search").value); 
// }

async function deleteItem(id) {
  try {
    const response = await fetch(`${baseURL}/items/${id}`, {
      method: "DELETE" // Use DELETE method
    });
    if (!response.ok) {
      // Handle potential errors from the server (e.g., item not found)
      console.error(`Error deleting item ${id}: ${response.statusText}`);
      // Optionally, inform the user
      // alert(`Failed to delete item: ${response.statusText}`);
      return; // Stop if deletion failed
    }
    // Reload items only if deletion was successful
    loadItems(document.getElementById("search").value);
  } catch (error) {
    console.error("Network error during deletion:", error);
    // Optionally, inform the user about network issues
    // alert("Network error. Could not delete item.");
  }
}
// new deleteItem function , which adds try catch functionality and Uses DELETE Crud instead of POST crud



document.getElementById("search").addEventListener("input", (e) => {
  loadItems(e.target.value); 
});
// Chocolate Question : Does React do Server-Side Rendering or Client-Side Rendering?
document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  await fetch(`${baseURL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //fixed from application/html to application/json
    body: JSON.stringify({ name, description })
  });
  e.target.reset();
  loadItems(document.getElementById("search").value);
});

loadItems();