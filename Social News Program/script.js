// Initialize links array with curated news examples
const links = [
  {
      title: "NASA's Latest Mars Discovery",
      url: "https://www.nasa.gov/mars-exploration",
      author: "Space Science Reporter"
  },
  {
      title: "Breakthrough in Renewable Energy",
      url: "https://www.science.org/energy-news",
      author: "Environmental Correspondent"
  },
  {
      title: "Global Economic Forecast 2024",
      url: "https://www.reuters.com/markets",
      author: "Economics Editor"
  }
];

// Function to format link for display
function formatLink(link, index) {
  return `
      <div class="link-item">
          <h3>${index + 1}. ${link.title}</h3>
          <p><a href="${link.url}" target="_blank">${link.url}</a></p>
          <p>Posted by: ${link.author}</p>
      </div>
  `;
}

// Function to show all links
function showLinks() {
  const linksListDiv = document.getElementById('linksList');
  
  if (links.length === 0) {
      linksListDiv.innerHTML = '<p style="text-align: center;">No links available</p>';
      return;
  }

  linksListDiv.innerHTML = links.map((link, index) => formatLink(link, index)).join('');
}

// Function to add a new link
function addNewLink() {
  const title = prompt("Enter the link title:");
  if (!title) return;

  let url = prompt("Enter the link URL:");
  if (!url) return;

  // Add http:// if protocol is missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
  }

  const author = prompt("Enter the author name:");
  if (!author) return;

  links.push({ title, url, author });
  showLinks();
  alert("Link added successfully!");
}

// Function to remove a link
function removeLink() {
  if (links.length === 0) {
      alert("No links to remove!");
      return;
  }

  const index = parseInt(prompt(`Enter the number of the link to remove (1-${links.length}):`));
  
  if (isNaN(index) || index < 1 || index > links.length) {
      alert("Invalid link number!");
      return;
  }

  const removedLink = links.splice(index - 1, 1)[0];
  showLinks();
  alert(`Removed: ${removedLink.title}`);
}

// Function to quit the program
function quitProgram() {
  if (confirm("Are you sure you want to quit?")) {
      window.location.href = "/index.html";
  }
}

// Initialize the program when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showLinks();
});
