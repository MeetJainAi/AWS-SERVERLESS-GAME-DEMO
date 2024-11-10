import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp, needsConfirmation, confirmSignUpCode, tempEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (needsConfirmation) {
        await confirmSignUpCode(tempEmail, verificationCode);
        await signIn(tempEmail, password);
      } else if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (needsConfirmation) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#240046] via-[#3c096c] to-[#5a189a] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Verify Your Email
            </h2>
            <p className="text-white/70 text-center mb-8">
              Please check your email ({tempEmail}) for the verification code
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl text-white outline-none"
                  placeholder="Enter verification code"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
              >
                Verify Email
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#240046] via-[#3c096c] to-[#5a189a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full filter blur-3xl transform translate-x-20 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full filter blur-3xl transform -translate-x-20 translate-y-10" />
          
          <div className="relative p-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-8 text-center"
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {isSignUp && (
                  <div className="inputBox">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-200"
                    />
                    <span>Username</span>
                  </div>
                )}

                <div className="inputBox">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-200"
                  />
                  <span>Email</span>
                </div>

                <div className="inputBox">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-200"
                  />
                  <span>Password</span>
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200"
                >
                  {isSignUp ? 'Already have an account?' : 'Need an account?'}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}