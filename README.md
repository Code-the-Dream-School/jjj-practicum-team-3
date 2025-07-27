# Full-Stack Repo for Node/React Practicum

This will be the repo for both the front-end and back-end team project.

## What is Next.js?

**Next.js** is a powerful **React framework** for building modern web applications. It adds extra features on top of React, such as:

- **Server-Side Rendering (SSR):** Your pages can be rendered on the server before being sent to the browser (faster loading and better SEO).
- **Static Site Generation (SSG):** Pre-build pages at build time for even faster performance.
- **API Routes:** Build backend endpoints directly inside your Next.js project.
- **File-based Routing:** Instead of setting up routes manually, you create files in the `pages/` folder, and Next.js automatically generates routes.
- **Built-in CSS and Image Optimization:** Write styles with CSS modules or styled-jsx and enjoy automatic optimizations.

In short, **Next.js = React + superpowers** 🚀.

## **Project Structure (Quick Overview)**

```
my-next-app/
├── public/          # Static assets (images, fonts, etc.)
├── src/             # Main source code
│   ├── pages/       # Pages (routes) go here (e.g., index.js = "/")
│   │   ├── api/     # API routes
│   │   └── index.js # Homepage
│   ├── components/  # Reusable React components
│   ├── styles/      # Global and component-level CSS
│   └── lib/         # (Optional) Helper functions or utilities
├── package.json     # Dependencies and scripts
└── next.config.js   # (Optional) Next.js configuration
```

## How to Run This Project

### **1. Install Dependencies**
Make sure you have **Node.js (>=18)** installed. Then run:

`npm install`

### **2. Start the Development Server**

`npm run dev`

### **3. Navigate to the Server**

http://localhost:3000/


## How to Add a New Page in Next.js 15

In **Next.js 15** (using the App Router), routes are **folders** inside the `app/` directory. Each route folder must include a `page.js` file.

### **1. Create a Folder**
Inside `src/app/`, create a new folder for your page.

### **2. Add a page.js File**
Inside the new folder, create a `page.js` file with a React component:

```jsx
// src/app/contact/page.js
export default function Contact() {
  return <h1>Contact Page</h1>;
}
```

### **3. Adding Multiple Pages**

For example, if you want `/about`, `/contact`, and `/services`, your structure would look like this:

```
src/app/
├── page.js        # Homepage ("/")
├── about/
│   └── page.js    # "/about"
├── contact/
│   └── page.js    # "/contact"
└── services/
    └── page.js    # "/services"
```

## Handling Requests from Frontend to Backend

Next.js allows you to create API routes using the app/ directory. These act like backend endpoints. By default, a new Next.js 15 project **does not include an `api/` folder.  

### **1. Create the API folder**

```
src/app/
├── api/
│   └── hello/
│       └── route.js
└── page.js
```

### **2. Inside the newly created src/app/api/hello/route.js file, add:**

```jsx
export async function GET() {
  return new Response(JSON.stringify({ message: "Hello from the backend!" }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

### **3. Fetch Data from the Frontend**

From any client-side component, you can call the API using fetch.

Example in `src/app/page.js`:

```jsx
"use client"; // Needed for client components

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setMessage(data.message);
    }
    fetchData();
  }, []);

  return <h1>{message}</h1>;
}
```

You can define multiple routes by adding more folders inside `src/app/api/`.
These API routes run on the server, so they would be used for database queries or calling secure external APIs.

## Layouts

A layout is a special React component that wraps the content (`page.js`) of a route. It is defined using a `layout.js` file and automatically receives the `children` prop, which represents the page being rendered.

For example, the default layout for your entire app is usually defined in:

src/app/layout.js

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
          <h1>My App Header</h1>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
        <footer style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
          <p>© 2025 My App</p>
        </footer>
      </body>
    </html>
  );
}
```

The children prop is where the content of each page.js file is rendered.
This layout will wrap every route in your application.

### When to use Layouts

 - To add global or section-specific components (like headers, sidebars, or footers).

 - To avoid repeating the same markup on every page.

 - To create different visual structures for different sections of your app.

**Note:** React by itself doesn’t have a built-in "layout system". However, you can create layout components that wrap other components, using the children prop.

## TypeScript in This Project

This Next.js project is automatically set up to use TypeScript. That means:

 - Components use .tsx instead of .jsx.
 - Other files use .ts instead of .js.

 You can write plain JavaScript inside .tsx or .ts files without using any TypeScript features. Next.js won’t force you to add types or strict typing. 

 So by keeping the TypeScript extensions it’s future-proof: Your project is already ready for TypeScript if you decide to use it later.

 Here is are a few good resource on TypeScript:

 - [Beginner's TypeScript](https://www.totaltypescript.com/tutorials/beginners-typescript)
 - [React with TypeScript](https://www.totaltypescript.com/tutorials/react-with-typescript?utm_source=chatgpt.com)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.