# GitHub CV Generator

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/nia-cloud-official/github-cv-generator)
![GitHub forks](https://img.shields.io/github/forks/nia-cloud-official/github-cv-generator)
![GitHub issues](https://img.shields.io/github/issues/nia-cloud-official/github-cv-generator)

This Node.js application generates a CV in PDF format using information from a GitHub account. It uses the GitHub API to fetch user data and `pdf-lib` to create the PDF.

## Features

- Fetches GitHub user data and repositories.
- Generates a CV in PDF format.
- Provides an API endpoint to download the generated CV.

## Usage

### Generate Your CV

1. Open your web browser.
2. Go to the following URL, replacing `your_github_username` with your GitHub username:

    ```
    https://github-cv-generator.onrender.com/generate-cv?username=your_github_username
    ```

3. The server will generate a PDF CV using the GitHub data and prompt you to download it.

### Example

If your GitHub username is `octocat`, navigate to:

```
https://github-cv-generator.onrender.com/generate-cv?username=octocat
```

The application will generate a PDF CV for the user `octocat` and prompt you to download it.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your changes to your fork.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

