'use client'

import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  // ✅ Validate session and load user from cookie
  useEffect(() => {
    const validate = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          console.warn('Invalid session');
          setUser(null);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setUser(null);
      }
    };

    validate();
  }, []);

  const handleGoogleLogin = async (response: any) => {
    try {
      const credential = response.credential;
      if (!credential) return alert('No Google credential received');

      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: credential,
      }, { withCredentials: true }); // ✅ Send/receive cookies

      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      alert('Google login failed');
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
      } else {
        const data = await res.json();
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Mallket - Continue with Google</h1>

      {!user ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert('Google login failed')}
        />
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h2>Welcome {user.firstName} {user.lastName}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role?.name}</p>

          <div>
            <p>Permissions:</p>
            <ul>
              {user.role?.permissions?.map((perm: any) => (
                <li key={perm.id || perm.action}>{perm.action}</li>
              ))}
            </ul>
          </div>

          <div>
            <p>Addresses:</p>
            <ul>
              {user.addresses?.length > 0 ? (
                user.addresses.map((addr: any) => (
                  <li key={addr.id}>
                    {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                  </li>
                ))
              ) : (
                <li>No addresses</li>
              )}
            </ul>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  )
}
