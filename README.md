# Next.js Project Installation Instructions

## Prerequisites

Ensure you have Node.js installed with a version higher than 18.

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   Check Node Version
   ```

Verify that your Node.js version is higher than 18:

bash
Copy code
node -v
Install Dependencies

Run the following command to install the necessary dependencies:

bash
Copy code
npm install
Create a .env File

In the root of the project, create a .env file and add the following keys:

env
Copy code
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dxq0m4l9x"
NEXT_PUBLIC_GEOLOCATION_API_KEY=fdsfsfs
If you have a custom loader time, add this line to the .env file:

env
Copy code
NEXT_PUBLIC_LOADING_TIME=1000
Run the Project

Use the following command to start the development server:

bash
Copy code
npm run dev
You're all set! The project should now be running on your local server.
