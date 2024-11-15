// functions/visit.js

let users = {};

exports.handler = async (event, context) => {
  // Get the user's IP address
  const userIp = event.headers['x-real-ip'] || event.headers['x-forwarded-for'] || 'unknown';

  // If the user has visited before, increment the visit count
  if (users[userIp]) {
    users[userIp].count++;
  } else {
    // If the user is visiting for the first time, add them to the list
    users[userIp] = {
      ip: userIp,
      count: 1,
    };
  }

  // Generate an HTML response to display the users and their visit counts
  let userListHtml = `<h1>User Visit Counts</h1><table border="1"><tr><th>IP Address</th><th>Visit Count</th></tr>`;
  for (let user of Object.values(users)) {
    userListHtml += `<tr><td>${user.ip}</td><td>${user.count}</td></tr>`;
  }
  userListHtml += `</table>`;

  return {
    statusCode: 200,
    body: userListHtml,
  };
};
