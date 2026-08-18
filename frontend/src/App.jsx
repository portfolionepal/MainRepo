import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState(null);
  
  // Auth state
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return; // Only fetch messages if logged in

    // Listen for new messages from Firestore
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
    }, (error) => {
      console.error('Error fetching messages: ', error);
    });

    return () => unsubscribeMessages();
  }, [user]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/configuration-not-found') {
        setAuthError('Email/Password authentication is not enabled in your Firebase Console. Please go to Authentication -> Sign-in method and enable Email/Password.');
      } else if (error.code === 'auth/invalid-api-key') {
        setAuthError('Invalid API Key. Please make sure your .env file is correct and restart the Vite server.');
      } else {
        setAuthError(error.message);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() && user) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: inputText,
          sender: user.uid,
          email: user.email,
          timestamp: serverTimestamp()
        });
        setInputText('');
      } catch (error) {
        console.error('Error sending message: ', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 font-sans justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 max-w-[90%]">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {isLoginMode ? 'Login to Chat' : 'Sign Up for Chat'}
          </h2>
          {authError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm rounded">
              {authError}
            </div>
          )}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-4 py-2 transition-colors mt-2 shadow-sm"
            >
              {isLoginMode ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setAuthError('');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              {isLoginMode ? 'Sign up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold tracking-tight">Live Chat App</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-blue-700 px-3 py-1.5 rounded-full truncate max-w-[120px] sm:max-w-xs font-medium">
            {user.email}
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-semibold transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg">No messages yet. Be the first to say hi!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[85%] md:max-w-md p-3 rounded-2xl shadow-sm ${msg.sender === user.uid ? 'bg-blue-500 text-white self-end rounded-br-sm' : 'bg-white text-gray-800 self-start rounded-bl-sm border border-gray-100'}`}
            >
              <div className={`text-xs opacity-75 mb-1 font-semibold ${msg.sender === user.uid ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.sender === user.uid ? 'You' : msg.email || `User ${msg.sender.slice(0, 5)}`}
              </div>
              <div className="break-words leading-relaxed">{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <form onSubmit={sendMessage} className="flex gap-2 max-w-4xl mx-auto items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 bg-gray-50 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2.5 w-11 h-11 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
