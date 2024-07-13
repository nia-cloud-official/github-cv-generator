// index.js
const express = require('express');
const axios = require('axios');
const { PDFDocument, rgb } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to fetch GitHub data
const fetchGitHubData = async (username) => {
  const userResponse = await axios.get(`https://api.github.com/users/${username}`);
  const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
  
  const userData = userResponse.data;
  const reposData = reposResponse.data;

  return {
    user: {
      name: userData.name,
      bio: userData.bio,
      avatarUrl: userData.avatar_url,
      location: userData.location,
      blog: userData.blog,
      githubUrl: userData.html_url
    },
    repos: reposData.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url
    }))
  };
};

// Function to generate PDF
const generatePDF = async (data) => {
  const { user, repos } = data;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  page.drawText(`Name: ${user.name}`, { x: 50, y: 750, size: 20 });
  page.drawText(`Bio: ${user.bio}`, { x: 50, y: 730, size: 15 });
  page.drawText(`Location: ${user.location}`, { x: 50, y: 710, size: 15 });
  page.drawText(`Blog: ${user.blog}`, { x: 50, y: 690, size: 15 });
  page.drawText(`GitHub: ${user.githubUrl}`, { x: 50, y: 670, size: 15, color: rgb(0, 0, 1) });

  let yOffset = 650;
  repos.forEach((repo, index) => {
    page.drawText(`Repo ${index + 1}: ${repo.name}`, { x: 50, y: yOffset, size: 15 });
    page.drawText(`Description: ${repo.description}`, { x: 50, y: yOffset - 20, size: 12 });
    page.drawText(`URL: ${repo.url}`, { x: 50, y: yOffset - 40, size: 12, color: rgb(0, 0, 1) });
    yOffset -= 60;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

// Route to generate CV
app.get('/generate-cv', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const data = await fetchGitHubData(username);
    const pdfBytes = await generatePDF(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate CV' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
