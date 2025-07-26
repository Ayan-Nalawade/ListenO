# ListenO

ListenO is a music streaming application built with React and Material-UI, inspired by the clean and modern aesthetic of `unseen.co`. It allows you to search and play YouTube videos, manage playlists, and enjoy a seamless music listening experience.

## Features

*   **YouTube Video Search & Playback:** Search for YouTube videos and play them directly within the application.
*   **Playlist Management:** Create, view, and add songs to custom playlists. Play songs directly from your playlists.
*   **Custom UI:** A minimalist, dark-themed user interface with subtle animations and refined typography, inspired by `apple.com` and `unseen.co`.
*   **Playback Controls:** Play, pause, skip next/previous, and adjust playback speed.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** Version 18.x or higher (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm:** Node Package Manager, which comes bundled with Node.js.

## Getting a YouTube Data API Key

To enable YouTube video search functionality, you need a Google Cloud Platform project with the YouTube Data API v3 enabled and an API key. Follow these steps:

1.  **Go to the Google Cloud Console:** Open your web browser and navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/).
2.  **Create a new project (if you don't have one):**
    *   Click on the project dropdown at the top of the page.
    *   Click "New Project".
    *   Give your project a name (e.g., "ListenO-YouTube-API") and click "Create".
3.  **Enable the YouTube Data API v3:**
    *   Once your project is created and selected, use the search bar at the top and type "YouTube Data API v3".
    *   Click on "YouTube Data API v3" in the search results.
    *   Click the "Enable" button.
4.  **Create API Credentials:**
    *   Go to "APIs & Services" > "Credentials" in the left-hand navigation menu.
    *   Click "+ Create Credentials" at the top and select "API Key".
    *   A new API key will be generated and displayed. **Copy this key immediately.**
    *   **Important (for production/public apps):** For a client-side application, it's highly recommended to restrict this API key to prevent unauthorized use. Click "Restrict Key" and:
        *   Under "Application restrictions", select "HTTP referrers (web sites)".
        *   Under "Website restrictions", add `http://localhost:3000/*` (or whatever port your React app runs on) to allow requests only from your local development server.
        *   Under "API restrictions", select "Restrict key" and choose "YouTube Data API v3" from the dropdown.
        *   Click "Save".

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayan-Nalawade/ListenO.git
    cd ListenO
    ```

2.  **Create a `.env` file:**
    In the root of your project directory, create a file named `.env`.

3.  **Add your YouTube API Key to `.env`:**
    Open the `.env` file and add the following line, replacing `YOUR_YOUTUBE_API_KEY` with the API key you obtained from Google Cloud:
    ```
    REACT_APP_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

To start the development server, run the following command in your project's root directory:

```bash
npm start
```

The application will open in your default web browser at `http://localhost:3000`.

## Usage

*   **Search Music:** Use the search bar on the home page to search for YouTube videos.
*   **Play Videos:** Click the "Play" button on any video card to start playback.
*   **Playback Controls:** Use the controls in the bottom player bar to play/pause, skip, and adjust playback speed.
*   **Create Playlists:** Navigate to the "Your Library" section to create new playlists.
*   **Add to Playlists:** From the search results or suggested videos, click the "Add" button on a video card and select a playlist to add the song to.
*   **View Playlists:** In the "Your Library" section, click on a playlist to view its contents.

## Troubleshooting

*   **`net::ERR_BLOCKED_BY_CLIENT` errors:** If you see these errors in your browser's console, a browser extension (like an ad blocker) might be blocking YouTube requests. Try disabling the extension for `localhost:3000`.
*   **YouTube API Key Issues:** Ensure your API key is correctly added to the `.env` file and that the YouTube Data API v3 is enabled and the key is properly restricted in your Google Cloud Console.

Enjoy ListenO!