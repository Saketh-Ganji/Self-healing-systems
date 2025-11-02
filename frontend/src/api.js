// For Java Backend
export async function getMessageFromJava() {
  const response = await fetch("http://localhost:9090/maven-archetype-webapp/hello");
  return response.text();
}

// For Node.js MySQL Backend
export async function getUsersFromNode() {
  const response = await fetch("http://localhost:3000/users");
  return response.json();
}

// Add User to Node.js Backend
export async function addUserToNode(user) {
  const response = await fetch("http://localhost:3000/adduser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}
