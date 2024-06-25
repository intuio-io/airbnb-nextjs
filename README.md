# Next.js Project Installation Instructions

## Prerequisites

Ensure you have Node.js installed with a version higher than 18.
Also be sure to set up the server either express or laravel

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Verify that your Node.js version is higher than 18:**
   Check Node Version

   ```bash
   node -v
   ```

3. **Run the following command to install the necessary dependencies:**
   Install Dependencies
   Check Node Version

   ```bash
   npm install
   ```

4. **In the root of the project, create a .env file and add the following keys:**
   Create a .env File

   ```bash
   # Base URL for the API
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

   # Cloudinary cloud name
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=someName

   # Geolocation API key
   NEXT_PUBLIC_GEOLOCATION_API_KEY=api

   # Custom loader time (optional)
   NEXT_PUBLIC_LOADING_TIME=1000
   ```

5. **Run the Project**
   Use the following command to start the development server:
   ```bash
   npm run dev
   ```

You're all set! The project should now be running on your local server.
