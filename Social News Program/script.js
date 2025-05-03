// Social News Program

// Link list storage
const links = [];

// Function to format and show all links
function showLinks() {
  if (links.length === 0) {
    alert("No links available.");
  } else {
    let output = "Current Links:\n\n";
    links.forEach((link, index) => {
      output += `${index}: "${link.title}" (${link.url}) by ${link.author}\n`;
    });
    alert(output);
  }
}

// Function to ensure URL starts with http:// or https://
function formatUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}

// Function to add a link
function addLink() {
  const title = prompt("Enter the link title:");
  const rawUrl = prompt("Enter the link URL:");
  const author = prompt("Enter the author's name:");

  if (!title || !rawUrl || !author) {
    alert("All fields are required to add a link.");
    return;
  }

  const url = formatUrl(rawUrl);
  links.push({ title, url, author });
  alert("Link added successfully.");
}

// Function to remove a link
function removeLink() {
  if (links.length === 0) {
    alert("No links to remove.");
    return;
  }

  let index;
  let validIndex = false;

  while (!validIndex) {
    index = prompt(`Enter the index of the link to remove (0 to ${links.length - 1}):`);
    index = Number(index);
    if (!isNaN(index) && index >= 0 && index < links.length) {
      validIndex = true;
    } else {
      alert("Invalid index. Please try again.");
    }
  }

  links.splice(index, 1);
  alert("Link removed successfully.");
}

// Main menu loop
function startMenu() {
  let userChoice;

  do {
    userChoice = prompt(
      "Choose an action:\n1: Show links\n2: Add a link\n3: Remove a link\n0: Quit"
    );

    switch (userChoice) {
      case "1":
        showLinks();
        break;
      case "2":
        addLink();
        break;
      case "3":
        removeLink();
        break;
      case "0":
        alert("Thank you for using the Social News Program. Goodbye!");
        break;
      default:
        alert("Invalid choice. Please enter 0, 1, 2, or 3.");
    }
  } while (userChoice !== "0");
}

// Start the app
startMenu();
