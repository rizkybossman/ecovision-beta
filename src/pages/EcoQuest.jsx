import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EcoQuestAuth from "./EcoQuestAuth";
import EcoQuestAdmin from "./EcoQuestAdmin";
import EcoQuestMissions from "./EcoQuestMissions";

const ADMIN_CREDS = {
  username: "admin",
  password: "admin123",
};

const EcoQuest = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("ecoQuestUser"));
    const savedSubmissions =
      JSON.parse(localStorage.getItem("ecoQuestSubmissions")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("ecoQuestUsers")) || [];

    if (savedUser) {
      // Check if this is the admin user
      const isAdminUser = savedUser.username === ADMIN_CREDS.username;

      const lastDate = new Date(savedUser.lastCompletedDate).toDateString();
      const today = new Date().toDateString();

      if (lastDate !== today) {
        const updatedUser = {
          ...savedUser,
          pendingApprovals: savedUser.pendingApprovals || [],
          lastCompletedDate: null,
        };
        localStorage.setItem("ecoQuestUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsAdmin(isAdminUser); // Set admin state here
      } else {
        setUser(savedUser);
        setIsAdmin(isAdminUser); // Set admin state here
      }
    }

    setSubmissions(savedSubmissions);
    setUsers(savedUsers);
  }, []);

  const handleLogin = (formData) => {
    if (isAdminLogin) {
      if (
        formData.username === ADMIN_CREDS.username &&
        formData.password === ADMIN_CREDS.password
      ) {
        const adminUser = {
          name: "Admin",
          username: "admin",
          isAdmin: true,
        };
        localStorage.setItem("ecoQuestUser", JSON.stringify(adminUser));
        setUser(adminUser);
        setIsAdmin(true);
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      const savedUsers =
        JSON.parse(localStorage.getItem("ecoQuestUsers")) || [];
      const foundUser = savedUsers.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );

      if (foundUser) {
        localStorage.setItem("ecoQuestUser", JSON.stringify(foundUser));
        setUser(foundUser);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleRegister = (formData) => {
    const newUser = {
      ...formData,
      totalPoints: 0,
      missionsCompleted: 0,
      lastCompletedDate: null,
      pendingApprovals: [],
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("ecoQuestUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("ecoQuestUser", JSON.stringify(newUser));
    setUsers(updatedUsers);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("ecoQuestUser");
    setUser(null);
    setIsAdmin(false);
    setIsAdminLogin(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <EcoQuestAuth
            onLogin={handleLogin}
            onRegister={handleRegister}
            isAdminLogin={isAdminLogin}
            setIsAdminLogin={setIsAdminLogin}
          />
        </main>
        <Footer className="mt-auto" />
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <EcoQuestAdmin
          submissions={submissions}
          users={users}
          onApprove={(id) => {
            const submission = submissions.find((s) => s.id === id);
            if (!submission) return;

            const updatedSubmissions = submissions.map((s) =>
              s.id === id ? { ...s, status: "approved" } : s
            );
            setSubmissions(updatedSubmissions);
            localStorage.setItem(
              "ecoQuestSubmissions",
              JSON.stringify(updatedSubmissions)
            );

            const savedUsers =
              JSON.parse(localStorage.getItem("ecoQuestUsers")) || [];
            const userToUpdate = savedUsers.find(
              (u) => u.username === submission.userId
            );
            if (userToUpdate) {
              const updatedUser = {
                ...userToUpdate,
                totalPoints: (userToUpdate.totalPoints || 0) + 20,
                missionsCompleted: (userToUpdate.missionsCompleted || 0) + 1,
                lastCompletedDate: new Date().toISOString(),
                pendingApprovals:
                  userToUpdate.pendingApprovals?.filter(
                    (id) => id !== submission.missionId
                  ) || [],
              };

              const updatedUsers = savedUsers.map((u) =>
                u.username === updatedUser.username ? updatedUser : u
              );
              localStorage.setItem(
                "ecoQuestUsers",
                JSON.stringify(updatedUsers)
              );
              setUsers(updatedUsers);
            }
            alert("Submission approved! User points updated.");
          }}
          onReject={(id) => {
            const updatedSubmissions = submissions.map((s) =>
              s.id === id ? { ...s, status: "rejected" } : s
            );
            setSubmissions(updatedSubmissions);
            localStorage.setItem(
              "ecoQuestSubmissions",
              JSON.stringify(updatedSubmissions)
            );
            alert("Submission rejected.");
          }}
          onLogout={handleLogout}
          onResetPoints={(username) => {
            const updatedUsers = users.map((u) =>
              u.username === username
                ? { ...u, totalPoints: 0, missionsCompleted: 0 }
                : u
            );
            localStorage.setItem("ecoQuestUsers", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            alert(`${username}'s points have been reset`);
          }}
          onDeleteUser={(username) => {
            if (username === "admin") {
              alert("Cannot delete admin account");
              return;
            }
            const updatedUsers = users.filter((u) => u.username !== username);
            localStorage.setItem("ecoQuestUsers", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            alert(`${username} has been deleted`);
          }}
        />
        <Footer className="mt-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <EcoQuestMissions
        user={user}
        submissions={submissions}
        onLogout={handleLogout}
        onSubmission={(missionId, submissionData) => {
          const newSubmission = {
            ...submissionData,
            id: Date.now(),
            userId: user.username,
            missionId,
            timestamp: new Date().toISOString(),
            status: "pending",
          };

          const updatedSubmissions = [...submissions, newSubmission];
          setSubmissions(updatedSubmissions);
          localStorage.setItem(
            "ecoQuestSubmissions",
            JSON.stringify(updatedSubmissions)
          );

          const updatedUser = {
            ...user,
            pendingApprovals: [...(user.pendingApprovals || []), missionId],
          };
          setUser(updatedUser);
          localStorage.setItem("ecoQuestUser", JSON.stringify(updatedUser));

          alert("Submission sent for approval!");
        }}
      />
      <Footer className="mt-auto" />
    </div>
  );
};

export default EcoQuest;
