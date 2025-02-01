# ChatiFly - AI Powered Chatting Application 🚀

Make chat a little bit more exciting by integrating AI capabilities with **GPT** and **DALL-E-3**! With **ChatiFly**, enjoy AI-powered conversations, multimedia creation, and an enhanced user experience.


## ⭐ About
ChatiFly is a next-gen messaging app that makes chatting **smarter and more fun**! With built-in **AI capabilities**, it allows users to:  
✅ Have AI-powered conversations  
✅ Generate **AI-created** images & media  
✅ Enjoy **seamless video calling**  


---

## 🔥 Tech Stack

- **Convex** → Database, real-time events, and cloud functions  
- **Next.js App Router** → Modern React framework  
- **ShadCN** → Beautiful UI components  
- **Convex File Storage** → Store images and videos securely  
- **ZegoCloud** → High-quality video calls  
- **Clerk** → Seamless user authentication  
- **Tailwind CSS** → Styling made easy  
- **TypeScript** → Maintainable and scalable code  

---

## 🚀 Deploy Your Own

Want to run ChatiFly yourself? Follow these steps:

### 1. Install Dependencies
   ```bash
   npm install
   ```

### 2. Run the Development Server
   ```bash
   npm run dev
   ```
   This will prompt you to log into Convex and create a project.

### 3. Set Up Clerk Authentication
   - Sign up at [Clerk](https://clerk.dev).
   - Copy `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` into `.env.local`.
   - Retrieve the Issuer URL (should look like `https://some-animal-123.clerk.accounts.dev`).
   - Add `CLERK_ISSUER_URL` and `CLERK_HOST_NAME` to your Convex environment variables.

### 4. Configure Webhooks
   - Go to your Clerk account’s WebHooks section.
   - Add an endpoint:
     ```
     https://your-convex-url.convex.site/clerk
     ```
   - Enable events: `user.created`, `user.updated`, `session.created`, `session.ended`.
   - Copy the webhook secret and add it as `CLERK_WEBHOOK_SECRET` in Convex Dashboard.

### 5. Enable AI-Powered Features
   - Create an account on [OpenAI](https://platform.openai.com).
   - Copy your `OPENAI_API_KEY` and add it to your Convex Dashboard.

### 6. Enable Video Calls
   - Sign up at [ZEGOCLOUD](https://www.zegocloud.com).
   - Create a project (select **Voice & Video Calls**).
   - Add `ZEGO_APP_ID` and `ZEGO_SERVER_SECRET` to `.env.local`.

---

## ✅ Ready to Use!
After setting everything up, ChatiFly should be fully functional! You can now:
- Chat with AI-powered assistance  
- Generate AI images using DALL-E  
- Make real-time video calls  

If you want to use **ChatiFly**,link coming soon..

---

## 🌐 Connect with Me
Follow me for more awesome projects!  
- **GitHub**: https://github.com/Harmit3
- **Twitter**:https://x.com/1410HP
- **LinkedIn**: https://www.linkedin.com/in/harmit-p-0720ab194/

---

## 📝 License
This project is licensed under the [MIT License](LICENSE).

---
