import React from "react";

const EcoQuestAdmin = ({
  submissions,
  users,
  onApprove,
  onReject,
  onLogout,
  onResetPoints,
  onDeleteUser,
}) => {
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  const approvedSubmissions = submissions.filter((s) => s.status === "approved");
  const rejectedSubmissions = submissions.filter((s) => s.status === "rejected");

  return (
    <main className="flex-grow container mx-auto px-4 py-8 mt-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700 mt-8">Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Pending Submissions ({pendingSubmissions.length})
          </h2>
          {pendingSubmissions.length > 0 ? (
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white p-4 rounded-lg shadow border border-gray-200"
                >
                  <h3 className="font-bold text-green-700">
                    Submission #{submission.id}
                  </h3>
                  <p className="text-gray-600 my-1">
                    User: {submission.userId}
                  </p>
                  <p className="text-gray-600 my-1">
                    Social Link:{" "}
                    <a
                      href={submission.socialMediaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </p>
                  <p className="text-gray-600 my-1">
                    Description: {submission.description}
                  </p>
                  <p className="text-gray-600 my-1">
                    Location:{" "}
                    {submission.location
                      ? `${submission.location.lat.toFixed(4)}, ${submission.location.lng.toFixed(4)}`
                      : "Not provided"}
                  </p>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => onReject(submission.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onApprove(submission.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending submissions</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            User Management ({users.length})
          </h2>
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.username}
                  className="bg-white p-4 rounded-lg shadow border border-gray-200"
                >
                  <h3 className="font-bold text-green-700">{user.name}</h3>
                  <p className="text-gray-600 my-1">@{user.username}</p>
                  <p className="text-gray-600 my-1">{user.email}</p>
                  <p className="text-gray-600 my-1">
                    Points: {user.totalPoints || 0} • Missions:{" "}
                    {user.missionsCompleted || 0}
                  </p>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => onResetPoints(user.username)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      Reset Points
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.username)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Submission History
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-green-700 mb-2">
              Approved ({approvedSubmissions.length})
            </h3>
            {approvedSubmissions.length > 0 ? (
              <div className="space-y-2">
                {approvedSubmissions.slice(0, 5).map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-green-50 p-3 rounded border border-green-200"
                  >
                    <p className="text-green-700">
                      #{submission.id} by {submission.userId}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No approved submissions</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2">
              Rejected ({rejectedSubmissions.length})
            </h3>
            {rejectedSubmissions.length > 0 ? (
              <div className="space-y-2">
                {rejectedSubmissions.slice(0, 5).map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-red-50 p-3 rounded border border-red-200"
                  >
                    <p className="text-red-700">
                      #{submission.id} by {submission.userId}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No rejected submissions</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EcoQuestAdmin;