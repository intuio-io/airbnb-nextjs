# Next.js Project Installation Instructions

## Prerequisites

Ensure you have Node.js version 18+ installed, and also be sure to set up the server either Express or Laravel, the server url will be need in the env has NEXT_PUBLIC_API_BASE_URL

We’ll also need cloudnary api key and preset key for image upload, below is the video on how to generate the api keys for cloundary, this will be needed in the env, will need the NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET

Follow the instructions to get credentials for cloudinary: [Cloudinary generate api credentials video](https://www.youtube.com/watch?v=paiO6M2wBqE)

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/intuio-io/rapidstay-nextjs.git

   # once installed, go into the rapidstay-nextjs folder
   cd rapidstay-nextjs
   ```

2. **Verify your node version**

   ```bash
   node -v
   ```

3. **Run the following command to install the necessary dependencies:**

   ```bash
   npm install
   ```

4. **In the root of the project, create a .env file and add the following keys:**

   ```bash
   # Base URL for the API
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

   # Cloudinary cloud name
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."

   # Cloudnary preset
   NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET="..."

   # Geolocation API key
   NEXT_PUBLIC_GEOLOCATION_API_KEY=api...

   # Custom loader time (optional)
   NEXT_PUBLIC_LOADING_TIME=1000

   # keep it ExpressSocket if your connecting with express else LaravelPusher if your connecting with Laravel
   NEXT_PUBLIC_SOCKET_TYPE="ExpressSocket"

   # Optional if using laravel has a backend
   NEXT_PUBLIC_PUSHER_APP_KEY="...."

   # Optional if using laravel has a backend
   NEXT_PUBLIC_PUSHER_APP_CLUSTER="..."
   ```

5. **Run the project to start your development server**
   ```bash
   npm run dev
   ```

You're all set! The project should now be running on your local server.

## You have now successfully setup your frontend. Now proceed on setting up a backend of your choice.

- Express : https://github.com/intuio-io/rapidstay-express
- Laravel : https://github.com/intuio-io/rapidstay-laravel
