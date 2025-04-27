/* General Reset */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  
  /* Navigation Bar */
  nav {
    background-color: #333;
    padding: 10px;
  }
  nav a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
  }
  nav a:hover {
    text-decoration: underline;
  }
  
  /* Container */
  .container {
    max-width: 800px;
    margin: 30px auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  }
  
  /* Rows and Columns */
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .col-6 { width: 50%; }
  .col-3, .col-2 { width: 25%; }
  
  /* Headers */
  h2, h3 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Inputs */
  input[type="number"] {
    width: 80%;
    padding: 5px;
    font-size: 1em;
  }
  
  /* Total Value */
  #total_value {
    font-size: 1.5em;
    color: green;
    font-weight: bold;
  }
  