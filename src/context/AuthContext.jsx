import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'app_users';
const LOGGED_USER_KEY = 'user';
const ADMIN_FLAG_KEY = 'admin_initialized';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(LOGGED_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // ✅ Crear admin solo una vez al iniciar
  useEffect(() => {
    const hasInitialized = localStorage.getItem(ADMIN_FLAG_KEY);

    if (!hasInitialized) {
      const users = getUsers();

      const adminExists = users.some(u => u.email === 'admin@robots.com');
      const id1Exists = users.some(u => u.id === 1);

      if (!adminExists && !id1Exists) {
        const adminUser = {
          id: 1,
          name: 'Administrador',
          email: 'admin@robots.com',
          password: 'admin123',
          role: 'admin',
        };
        users.push(adminUser);
        saveUsers(users);
        console.log('✅ Usuario admin creado automáticamente');
      } else {
        console.log('ℹ️ Admin ya existente. No se vuelve a crear.');
      }

      localStorage.setItem(ADMIN_FLAG_KEY, 'true');
    }
  }, []);

  const register = ({ name, email, password, role }) => {
    const users = getUsers();

    if (users.some(u => u.email === email)) {
      toast.error('Este email ya está registrado.');
      return false;
    }

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = { id: nextId, name, email, password, role };
    users.push(newUser);
    saveUsers(users);

    setUser(newUser);
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(newUser));
    toast.success('Registro exitoso');

    return true;
  };

  const login = ({ email, password }) => {
    const users = getUsers();

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      // No mostrar toast aquí para error de login
      return false;
    }

    setUser(foundUser);
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(foundUser));
    toast.success(`Bienvenido, ${foundUser.name || foundUser.email}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOGGED_USER_KEY);
  };

  const role = user?.role || 'guest';

  return (
    <AuthContext.Provider value={{ user, role, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);








