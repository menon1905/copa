import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const { login, signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

const handleAuth = async (e) => {
        e.preventDefault();
        
        // Validate input
        if (!email || !password) {
            setIsError(true);
            setMessage('Por favor, preencha todos os campos');
            return;
        }

        if (password.length < 6) {
            setIsError(true);
            setMessage('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            if (isSignUp) {
                await signup(email, password);
                setMessage('Conta criada com sucesso! Redirecionando...');
                setTimeout(() => navigate('/'), 1500);
            } else {
                await login(email, password);
                setMessage('Login bem-sucedido! Redirecionando...');
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (error) {
            setIsError(true);
            // Handle specific Supabase errors
            if (error.message?.includes('Invalid login credentials')) {
                setMessage('Email ou senha incorretos');
            } else if (error.message?.includes('User already registered')) {
                setMessage('Este email já está registrado');
            } else if (error.message?.includes('Password should be at least 6 characters')) {
                setMessage('A senha deve ter pelo menos 6 caracteres');
            } else {
                setMessage(error.message || 'Erro ao processar. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page container">
            <div className="auth-card">
                <h2>{isSignUp ? 'Criar Conta' : 'Entrar'}</h2>
                <p>{isSignUp ? 'Junte-se à nossa comunidade de colecionadores!' : 'Bem-vindo de volta!'}</p>

                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Processando...' : isSignUp ? 'CRIAR CONTA' : 'ABRIR SESSÃO'}
                    </button>
                </form>

                {message && (
                    <p className={`auth-message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}

                <div className="auth-toggle">
                    {isSignUp ? (
                        <p>Já tem uma conta? <button onClick={() => setIsSignUp(false)}>Entrar</button></p>
                    ) : (
                        <p>Ainda não tem conta? <button onClick={() => setIsSignUp(true)}>Criar uma</button></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
