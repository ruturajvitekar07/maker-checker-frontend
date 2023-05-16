import { useState } from 'react';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSwalOpen, setIsSwalOpen] = useState(false);

  return { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn };
}

export default useAuth;
