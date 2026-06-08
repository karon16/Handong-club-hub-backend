const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
  try {
    const formData = new FormData();
    formData.append('firstName', 'Test');
    formData.append('lastName', 'User');
    formData.append('email', 'test@example.com');
    formData.append('studentId', '22000000');
    formData.append('clubName', 'Test Club ' + Date.now());
    // Create a random UUID for category
    formData.append('clubCategory', '00000000-0000-0000-0000-000000000000');
    formData.append('clubDescription', 'Test description');

    // Create a dummy file
    const filePath = path.join(__dirname, 'dummy.pdf');
    fs.writeFileSync(filePath, 'dummy content');

    formData.append('clubDocument', fs.createReadStream(filePath));

    // We need a valid token for `authenticate`, but wait, we can't easily bypass it unless we login.
    // Let's just send the request without token and see if it hits the auth error,
    // or if the multipart parsing fails before auth.
    // Actually, auth is before upload: `authenticate, upload.single('clubDocument')`.
    // So we need a token.
    console.log('We need a valid token to test properly.');
  } catch (err) {
    console.error(err);
  }
}

testUpload();
