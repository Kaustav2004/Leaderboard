import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const [selectedUser, setSelectedUser] = useState(null); // For the selected user

  useEffect(() => {
    // Fetch the data from data.json
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error("Invalid data format: 'users' array is missing.");
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false)); // Ensure we stop loading after fetch
  }, []);

  // If there's an error, show an error message
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // While loading, show a loading message
  if (loading) {
    return <p className="text-white text-center">Loading leaderboard...</p>;
  }

  // Handle user card click
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Close modal
  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="w-screen h-full p-6">
      <h1 className="text-white text-3xl font-bold mb-4">Leaderboard</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        {/* Top 3 users */}
        <div className="flex justify-center items-start">
          <div className="flex flex-row space-x-4">
            {users[1] && (
              <div
                className="flex flex-col justify-end items-center relative flex-grow md:w-1/3 lg:w-1/4 user-card"
                onClick={() => handleUserClick(users[1])}
              >
                <div className="bg-gray-800 rounded-lg p-4 flex flex-col justify-center items-center transition-transform transform hover:scale-105" style={{ height: '180px' }}>
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-60px] w-16 h-16 rounded-full border-4 border-blue-400 bg-gray-600 flex items-center justify-center shadow-md">
                      <div className="text-4xl text-white">{users[1].name.charAt(0)}</div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 w-8 h-8 bg-blue-400 text-white text-sm rounded-full border-2 border-blue-400 flex items-center justify-center">
                        {users[1].rank}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg text-blue-400 font-bold mt-10">{users[1].name}</div>
                  <p className="text-blue-400 text-xl font-bold">{users[1].score}</p>
                </div>
              </div>
            )}

            {users[0] && (
              <div
                className="flex flex-col justify-end items-center relative flex-grow transition-transform transform hover:scale-105"
                onClick={() => handleUserClick(users[0])}
              >
                <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-center items-center" style={{ height: '220px' }}>
                  <div className="relative">
                    <div className='absolute -top-[130px] left-1/2 transform -translate-x-1/2 z-10 text-4xl'>👑</div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-100px] w-20 h-20 rounded-full border-4 border-yellow-300 bg-gray-600 flex items-center justify-center shadow-md">
                      <div className="text-4xl text-white">{users[0].name.charAt(0)}</div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-14 w-8 h-8 bg-yellow-300 text-white text-sm rounded-full border-2 border-yellow-300 flex items-center justify-center">
                        {users[0].rank}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl text-yellow-100 font-bold mt-12">{users[0].name}</div>
                  <p className="text-yellow-100 text-xl font-bold">{users[0].score}</p>
                </div>
              </div>
            )}

            {users[2] && (
              <div
                className="flex flex-col justify-end items-center relative flex-grow md:w-1/3 lg:w-1/4 user-card"
                onClick={() => handleUserClick(users[2])}
              >
                <div className="bg-gray-800 rounded-lg p-4 flex flex-col justify-center items-center transition-transform transform hover:scale-105" style={{ height: '160px' }}>
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-60px] w-16 h-16 rounded-full border-4 border-green-400 bg-gray-600 flex items-center justify-center shadow-md">
                      <div className="text-4xl text-white">{users[2].name.charAt(0)}</div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 w-8 h-8 bg-green-400 text-white text-sm rounded-full border-2 border-green-400 flex items-center justify-center">
                        {users[2].rank}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg text-green-400 font-bold mt-10">{users[2].name}</div>
                  <p className="text-green-400 text-xl font-bold">{users[2].score}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Remaining users */}
        <ul className="mt-6">
          {users.slice(3).map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-3 user-card transition-transform transform hover:scale-105"
              onClick={() => handleUserClick(user)} // Add click handler here
            >
              <div className="flex justify-between items-center w-full bg-gray-900 rounded-lg p-4 shadow-lg cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <div className="text-3xl text-white font-bold">{user.name.charAt(0)}</div>
                  </div>
                  <span className="text-white text-xl ml-4 font-semibold">
                    {user.name} <span className="text-gray-300">(Rank: {user.rank})</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-white text-lg mr-4 font-medium">Score: <span className="text-green-400">{user.score}</span></span>
                  <span className="text-white text-lg font-medium">Price: <span className="text-yellow-400">₹{user.price}</span></span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for user details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 transform transition-transform duration-300 ease-out popup">
            <h2 className="text-white text-2xl font-bold mb-2">{selectedUser.name}</h2>
            <p className="text-white">Rank: {selectedUser.rank}</p>
            <p className="text-white">Score: {selectedUser.score}</p>
            <p className="text-white">Price: ₹{selectedUser.price}</p>
            {/* Add any additional user details here */}
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
