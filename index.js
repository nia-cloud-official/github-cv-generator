const express = require('express');
const axios = require('axios');
const { PDFDocument, rgb } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3000;

// Generate CV endpoint
app.get('/generate-cv', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Fetch user data from GitHub API
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

    // Extract relevant user and repository information
    const userData = userResponse.data;
    const repositories = reposResponse.data;

    // Generate PDF
    const pdfDoc = await generatePdf(userData, repositories);

    // Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${username}_CV.pdf"`);
    res.send(await pdfDoc.save());
  } catch (error) {
    console.error('Failed to generate CV:', error.message);
    res.status(500).json({ error: 'Failed to generate CV' });
  }
});

// Function to generate PDF
async function generatePdf(userData, repositories) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Set font and font size
  const font = await pdfDoc.embedFont('Helvetica');
  const fontSize = 18;

  // Add header
  page.drawText(`GitHub CV for ${userData.login}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Add user information
  page.drawText(`Name: ${userData.name || 'N/A'}`, {
    x: 50,
    y: height - 150,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Add repository list
  page.drawText('Repositories:', {
    x: 50,
    y: height - 200,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  let repoY = height - 230;
  repositories.slice(0, 5).forEach((repo) => {
    page.drawText(`- ${repo.name}`, {
      x: 70,
      y: repoY,
      size: fontSize - 2,
      font,
      color: rgb(0, 0, 0),
    });
    repoY -= 20;
  });

  return pdfDoc;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});