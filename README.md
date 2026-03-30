# Task Management System 📋

A simple and clean task manager built with React. Create, organize, and track your tasks with user accounts and a beautiful interface.

## ✨ What You Can Do

- **👤 User Accounts**: Sign up and log in to keep your tasks private
- **📝 Create Tasks**: Add tasks with titles, descriptions, and due dates
- **🏷️ Organize**: Set priorities (Low/Medium/High) and categories
- **📊 Track Progress**: Mark tasks as Todo, In Progress, or Done
- **📱 Works Everywhere**: Looks great on phones, tablets, and computers
- **🔄 Real-time Updates**: Changes save instantly

## 🛠️ Quick Setup (5 minutes)

### Prerequisites
Make sure you have these installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

1. **Download the project**
   ```bash
   git clone https://github.com/mdbulbulhasan/task-management-system.git
   cd task-management-system/task-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Go to `http://localhost:5173`

**That's it!** 🎉 Your task manager is now running.

## 🚀 How to Use

### Getting Started
1. **Create Account**: Click "Register" and fill in your email/password
2. **Sign In**: Use your account to log in
3. **Add Tasks**: Click "Add New Task" to create your first task

### Task Features
- **Title**: Give your task a name
- **Description**: Add details about what needs to be done
- **Priority**: Choose Low, Medium, or High importance
- **Due Date**: Set when the task should be finished
- **Category**: Group similar tasks together
- **Status**: Track progress (Todo → In Progress → Done)

### Tips
- Use the sidebar to switch between grid and list view
- Click the edit icon to modify tasks
- Click the delete icon to remove tasks
- Your tasks are private - only you can see them!

## 🏗️ Tech Stack

- **React** - User interface
- **Vite** - Fast development server
- **Tailwind CSS** - Beautiful styling
- **React Router** - Page navigation
- **LocalStorage** - Data storage (browser memory)

## 📂 Project Files

```
src/
├── components/     # Reusable UI pieces (buttons, forms, etc.)
├── pages/         # Main pages (Dashboard, Login, Register)
├── APIs/          # Data functions (save/load tasks)
├── context/       # App-wide settings (user login state)
└── router/        # Page navigation setup
```

## 🔧 Development

### Useful Commands
```bash
npm run dev      # Start development server
npm run build    # Create production version
npm run preview  # Test production build
```

### Making Changes
1. Edit files in the `src/` folder
2. Save and see changes instantly (hot reload)
3. Test your changes in the browser

## 🤝 Contributing

Want to help improve this project?

1. **Fork** this repository
2. **Create** your feature branch (`git checkout -b my-new-feature`)
3. **Commit** your changes (`git commit -m 'Add some feature'`)
4. **Push** to the branch (`git push origin my-new-feature`)
5. **Open** a Pull Request

## 📝 License

This project is free to use under the MIT License.

## 💡 Future Ideas

- [ ] Connect to a real database (instead of browser storage)
- [ ] Share tasks with other users
- [ ] Add file attachments to tasks
- [ ] Send email reminders for due dates
- [ ] Mobile app version
- [ ] Dark mode theme

---

**Happy task managing!** 😊 Built with React & Vite