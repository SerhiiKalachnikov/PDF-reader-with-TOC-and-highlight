# 📚✨ Beautiful PDF Reader with TOC and Highlight 🖍️

An interactive PDF reader web application with a table of contents and text highlighting capabilities. It allows users to view PDFs, navigate through documents using the TOC, and search and highlight text within the document.

## 🛠️ Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=blue)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-FFB900?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React-PDF](https://img.shields.io/badge/React--PDF-61DAFB?style=for-the-badge&logo=react&logoColor=blue)

## 🚀 Features

- 🔍 Search and highlight text within PDFs
- 📑 Interactive table of contents for easy navigation
- 📖 Smooth PDF rendering using React and PDF.js
- 🖥️ Backend server with Express to serve PDF files and TOC data
- 💅 Styled with Material-UI for a responsive design

## 📋 Table of Contents

- [📁 Project Structure](#-project-structure)
- [📦 Installation](#-installation)
  - [⚙️ Prerequisites](#prerequisites)
  - [📂 Clone the repository](#clone-the-repository)
  - [🔧 Setup Backend Server](#setup-backend-server)
  - [🔨 Setup Frontend Application](#setup-frontend-application)
- [🎯 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## 📁 Project Structure

```txt
/C:/Git2/PDF-reader-with-TOC-and-highlight/
├── express-pdf-server
│   ├── node_modules
│   ├── src
│   ├── package.json
│   └── ...
└── pdf-viewer-app
    ├── node_modules
    ├── src
    ├── package.json
    └── ...
```

## 📦 Installation

### Prerequisites

- Node.js and npm installed

### Clone the repository

```bash
git clone https://github.com/yourusername/PDF-reader-with-TOC-and-highlight.git
cd PDF-reader-with-TOC-and-highlight
```

### Setup Backend Server

Navigate to the `express-pdf-server` directory:

```bash
cd express-pdf-server
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server will run on [http://localhost:8082](http://localhost:8082)

### Setup Frontend Application

Open a new terminal and navigate to the `pdf-viewer-app` directory:

```bash
cd pdf-viewer-app
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Use the search bar to find and highlight text within the PDF.
3. Navigate through the document using the interactive table of contents.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.
